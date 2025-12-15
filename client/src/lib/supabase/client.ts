import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@/lib/types/database.types';

export function createClient() {
  if (!process.env.NEXT_PUBLIC_dreamhair_crowns_SUPABASE_URL) {
    console.log("no process.env.NEXT_PUBLIC_dreamhair_crowns_SUPABASE_URL")
  }
  if (!process.env.NEXT_PUBLIC_dreamhair_crowns_SUPABASE_PUBLISHABLE_KEY) {
    console.log("no process.env.NEXT_PUBLIC_dreamhair_crowns_SUPABASE_PUBLISHABLE_KEY")
  }
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_dreamhair_crowns_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_dreamhair_crowns_SUPABASE_PUBLISHABLE_KEY!
  );
}