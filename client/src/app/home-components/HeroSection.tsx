import Image from 'next/image';
import Link from '@/components/ui/Link';
import { FaShoppingCart } from 'react-icons/fa';

const HeroSection: React.FC = () => {
	return (
		<section className='relative min-h-[85vh] flex flex-col items-center justify-center text-center overflow-hidden -mt-20 pt-20 group'>
			{/* Minimalist Background - Pure Black/Gradient defined in global css, here we just add subtle overlay if needed */}
			<div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900/20 via-black/60 to-black"></div>

			<div className="relative z-10 flex flex-col items-center max-w-5xl mx-auto px-4 animate-in fade-in zoom-in duration-1000">
				<div className="mb-8 p-6 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 shadow-[0_0_50px_-12px_rgba(212,175,55,0.2)]">
					{/* Placeholder for Logo */}
					<Image
						src='/PA_Logo.png'
						alt='Dreamhair Crowns Logo'
						width={200}
						height={200}
						priority
						className='w-32 md:w-48 h-auto drop-shadow-2xl'
					/>
				</div>

				<h1 className="mb-6 text-5xl md:text-7xl lg:text-8xl font-bold tracking-widest text-white drop-shadow-sm font-small-caps">
					Wear Your <span className="text-[var(--theme-gold)]">Crown.</span>
				</h1>

				<p className='mt-4 text-xl md:text-2xl text-white/80 font-light max-w-3xl leading-relaxed tracking-wide'>
					Experience the finest Brazilian hair extensions, precision styling tools, and designer footwear curated for the modern queen.
					<span className="block mt-2 font-medium text-[var(--theme-gold)]">Crown Yourself in Luxury.</span>
				</p>

				<div className='flex flex-col sm:flex-row w-full justify-center gap-6 mt-12'>
					<Link
						variant='button'
						href='/shop'
						className='group flex items-center justify-center gap-3 px-8 py-4 bg-[var(--theme-gold)] hover:bg-[var(--theme-gold-light)] text-black rounded-full font-bold uppercase tracking-widest shadow-lg shadow-orange-900/20 transition-all duration-300 hover:-translate-y-1'>
						<FaShoppingCart className="group-hover:animate-bounce" />
						<span>Shop Collection</span>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;