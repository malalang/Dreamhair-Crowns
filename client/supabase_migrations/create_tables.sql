-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- -----------------------------------------------------------------------------
-- 1. PROFILES & AUTHENTICATION
-- -----------------------------------------------------------------------------

-- Create profiles table (extends auth.users)
CREATE TABLE public.profiles (
  id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  display_name text,
  phone text,
  role text DEFAULT 'customer'::text CHECK (role IN ('customer', 'admin', 'staff', 'manager')),
  uid text,
  email_verified boolean DEFAULT false,
  photo_url text,
  address text,
  city text,
  state text,
  zip_code text,
  country text,
  theme text DEFAULT 'system'::text,
  tier_status text DEFAULT 'Bronze'::text,
  referral_code text,
  preferences jsonb DEFAULT '{"dietaryRestrictions": [], "favoriteItems": [], "communicationPreferences": {"sms": false, "email": true, "promotions": true}}'::jsonb,
  saved_payment_methods jsonb DEFAULT '[]'::jsonb,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  last_login timestamp with time zone,
  CONSTRAINT profiles_pkey PRIMARY KEY (id)
);

-- Create admins table (explicit admin tracking)
CREATE TABLE public.admins (
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT admins_pkey PRIMARY KEY (user_id)
);

-- Function to handle new user signup automatically
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name, uid, role, metadata)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'display_name', NEW.email),
    NEW.id::text,
    COALESCE(NEW.raw_user_meta_data ->> 'role', 'customer'),
    jsonb_build_object('raw_user_meta_data', NEW.raw_user_meta_data)
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- Trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- -----------------------------------------------------------------------------
-- 2. PRODUCTS & CATEGORIES
-- -----------------------------------------------------------------------------

CREATE TABLE public.products_category (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  category_name text NOT NULL,
  image text,
  description text,
  is_hidden boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT products_category_pkey PRIMARY KEY (id),
  CONSTRAINT products_category_name_unique UNIQUE (category_name)
);

CREATE TABLE public.products (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text,
  description text,
  price numeric DEFAULT 0,
  category_name text REFERENCES public.products_category(category_name) ON UPDATE CASCADE ON DELETE SET NULL,
  image_url text,
  stock integer DEFAULT 0,
  badge text,
  is_hidden boolean DEFAULT false,
  likes uuid[] DEFAULT '{}'::uuid[], -- Array of user UUIDs who liked the product
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT products_pkey PRIMARY KEY (id),
  CONSTRAINT products_slug_unique UNIQUE (slug)
);

-- -----------------------------------------------------------------------------
-- 3. ORDERS & SHOPPING
-- -----------------------------------------------------------------------------

CREATE TABLE public.orders (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  items jsonb NOT NULL, -- Stores snapshot of cart items { name, qty, price, id }
  total_price numeric NOT NULL DEFAULT 0,
  total_quantity integer NOT NULL DEFAULT 0,
  status text DEFAULT 'pending'::text CHECK (status IN ('pending', 'processing', 'completed', 'cancelled', 'deleted')),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT orders_pkey PRIMARY KEY (id)
);

CREATE TABLE public.user_favorites (
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT user_favorites_pkey PRIMARY KEY (user_id, product_id)
);

-- -----------------------------------------------------------------------------
-- 4. SOCIAL & CONTENT
-- -----------------------------------------------------------------------------

CREATE TABLE public.comments (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES public.products(id) ON DELETE CASCADE,
  user_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  user_name text,
  body text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT comments_pkey PRIMARY KEY (id)
);

CREATE TABLE public.testimonials (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  text text NOT NULL,
  author text NOT NULL,
  rating integer DEFAULT 5,
  likes uuid[] DEFAULT '{}'::uuid[],
  comments jsonb DEFAULT '[]'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT testimonials_pkey PRIMARY KEY (id)
);

CREATE TABLE public.featured_items (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  image_url text,
  likes uuid[] DEFAULT '{}'::uuid[],
  comments jsonb DEFAULT '[]'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT featured_items_pkey PRIMARY KEY (id)
);

-- -----------------------------------------------------------------------------
-- 5. UTILITY & SERVICES
-- -----------------------------------------------------------------------------

CREATE TABLE public.contact (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT contact_pkey PRIMARY KEY (id)
);

CREATE TABLE public.photo_boot_bookings (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  date date NOT NULL,
  time time without time zone NOT NULL,
  package text NOT NULL,
  people integer NOT NULL DEFAULT 1,
  message text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT photo_boot_bookings_pkey PRIMARY KEY (id)
);

-- -----------------------------------------------------------------------------
-- 6. ROW LEVEL SECURITY (RLS)
-- -----------------------------------------------------------------------------

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE products_category ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE featured_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact ENABLE ROW LEVEL SECURITY;
ALTER TABLE photo_boot_bookings ENABLE ROW LEVEL SECURITY;

-- --- PROFILES ---
-- Users can read their own profile
CREATE POLICY "Users can read own profile" ON profiles FOR SELECT USING (auth.uid() = id);
-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
-- Admins can read all profiles
CREATE POLICY "Admins can read all profiles" ON profiles FOR SELECT USING (EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid()));

-- --- ADMINS ---
-- Only admins can read the admins table
CREATE POLICY "Admins read access" ON admins FOR SELECT USING (auth.uid() = user_id);

-- --- PRODUCTS & CATEGORIES ---
-- Public can read products
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Public read categories" ON products_category FOR SELECT USING (true);
-- Only Admins can insert/update/delete products
CREATE POLICY "Admins manage products" ON products FOR ALL USING (EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid()));
CREATE POLICY "Admins manage categories" ON products_category FOR ALL USING (EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid()));

-- --- ORDERS ---
-- Users can read their own orders
CREATE POLICY "Users read own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
-- Users can create orders
CREATE POLICY "Users create orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);
-- Admins can read all orders
CREATE POLICY "Admins read all orders" ON orders FOR SELECT USING (EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid()));
-- Admins can update orders (status changes)
CREATE POLICY "Admins update orders" ON orders FOR UPDATE USING (EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid()));

-- --- FAVORITES ---
-- Users manage their own favorites
CREATE POLICY "Users manage favorites" ON user_favorites FOR ALL USING (auth.uid() = user_id);

-- --- COMMENTS ---
-- Public can read comments
CREATE POLICY "Public read comments" ON comments FOR SELECT USING (true);
-- Authenticated users can create comments
CREATE POLICY "Users create comments" ON comments FOR INSERT WITH CHECK (auth.uid() = user_id);
-- Users can delete their own comments, Admins can delete any
CREATE POLICY "Delete comments" ON comments FOR DELETE USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid()));

-- --- CONTENT (Testimonials, Featured Items) ---
-- Public read
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public read featured" ON featured_items FOR SELECT USING (true);
-- Admin write
CREATE POLICY "Admins manage testimonials" ON testimonials FOR ALL USING (EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid()));
CREATE POLICY "Admins manage featured" ON featured_items FOR ALL USING (EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid()));

-- --- CONTACT & BOOKINGS ---
-- Public can insert (submit forms)
CREATE POLICY "Public create contact" ON contact FOR INSERT WITH CHECK (true);
CREATE POLICY "Public create booking" ON photo_boot_bookings FOR INSERT WITH CHECK (true);
-- Admins can read/manage
CREATE POLICY "Admins manage contact" ON contact FOR ALL USING (EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid()));
CREATE POLICY "Admins manage bookings" ON photo_boot_bookings FOR ALL USING (EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid()));

-- -----------------------------------------------------------------------------
-- 7. STORAGE BUCKETS (Optional - run manually via dashboard if SQL not supported)
-- -----------------------------------------------------------------------------
-- Note: Creating buckets via SQL requires the `storage` extension and permissions.
-- Ideally, create a bucket named 'pa-luxe-creation' in the Storage section of the dashboard
-- and set it to Public.

-- SQL to insert bucket configuration if your setup allows it:
INSERT INTO storage.buckets (id, name, public) 
VALUES ('pa-luxe-creation', 'pa-luxe-creation', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policy: Public Read
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'pa-luxe-creation');
-- Storage Policy: Admin Upload/Delete
CREATE POLICY "Admin Write" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'pa-luxe-creation' AND (EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid())));
CREATE POLICY "Admin Delete" ON storage.objects FOR DELETE USING (bucket_id = 'pa-luxe-creation' AND (EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid())));
-- Storage Policy: Authenticated Upload (for user profile photos)
CREATE POLICY "User Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'pa-luxe-creation' AND auth.role() = 'authenticated');