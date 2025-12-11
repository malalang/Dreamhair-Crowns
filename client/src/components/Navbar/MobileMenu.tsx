'use client';
import AppLink from '../ui/Link';
import { HiHome, HiInformationCircle, HiEnvelope, HiPhoto, HiBriefcase, HiShoppingBag } from 'react-icons/hi2';
import { usePathname } from 'next/navigation';

const publicPaths = [
	{ path: '/', icon: HiHome, label: 'Home' },
	{ path: '/shop', icon: HiShoppingBag, label: 'Shop' },
	{ path: '/services', icon: HiBriefcase, label: 'Services' },
	{ path: '/gallery', icon: HiPhoto, label: 'Gallery' },
	{ path: '/about', icon: HiInformationCircle, label: 'About' },
	{ path: '/contact', icon: HiEnvelope, label: 'Contact' },
];

const MobileMenu: React.FC<{
	setMenubar: (path: 'mobile' | 'profile') => void;
}> = ({ setMenubar }) => {
	const pathname = usePathname();

	return (
		<nav className='md:hidden absolute top-full left-0 right-0 bg-neutral-900/98 backdrop-blur-xl border-b border-white/10 shadow-2xl transition-all duration-300 z-40 max-h-screen overflow-y-auto'>
			<ul className='flex flex-col p-4 gap-2'>
				{publicPaths.map(({ path, icon: Icon, label }) => {
					const isActive = pathname === path;
					return (
						<li key={path}>
							<AppLink
								href={path}
								onClick={() => setMenubar('mobile')}
								className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 w-full ${isActive
									? 'bg-white/5 border border-[var(--theme-gold)] text-[var(--theme-gold)] shadow-md'
									: 'text-white/80 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
									}`}>
								<Icon className={`text-xl ${isActive ? 'text-[var(--theme-gold)]' : ''}`} />
								<span>{label}</span>
							</AppLink>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default MobileMenu;