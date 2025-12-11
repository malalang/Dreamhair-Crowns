'use client';
import AppLink from '@/components/ui/Link';
import Image from 'next/image';
import {
	HiHome,
	HiInformationCircle,
	HiEnvelope,
	HiPhoto,
	HiBriefcase,
	HiShoppingBag,
} from 'react-icons/hi2';
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/lib/supabase/auth/useAuth';
import { usePathname } from 'next/navigation';

const publicPaths = [
	{ path: '/', icon: HiHome, label: 'Home' },
	{ path: '/shop', icon: HiShoppingBag, label: 'Shop' },
	{ path: '/services', icon: HiBriefcase, label: 'Services' },
	{ path: '/gallery', icon: HiPhoto, label: 'Gallery' },
	{ path: '/about', icon: HiInformationCircle, label: 'About' },
	{ path: '/contact', icon: HiEnvelope, label: 'Contact' },
];

const DesktopNavbar: React.FC = () => {
	// keeping hooks for future use if needed (e.g. profile menu)
	const { user } = useAuth();
	const pathname = usePathname();
	const [profileOpen, setProfileOpen] = useState(false);
	const profileRef = useRef<HTMLLIElement>(null);

	return (
		<nav className='hidden md:flex gap-4 justify-between items-center p-0 m-0 w-full'>
			<AppLink href='/' className='shrink-0'>
				{/* Placeholder logo until we have the real file, or text fallback */}
				<Image
					src='/PA_Logo.png'
					alt='Dreamhair Crowns Logo'
					width={64}
					height={64}
					className='h-16 w-auto'
					priority
				/>
			</AppLink>

			<ul className='flex space-x-2 items-center'>
				{publicPaths.map(({ path, icon: Icon, label }) => {
					const isActive = pathname === path;
					return (
						<li key={path}>
							<AppLink
								href={path}
								className={`group relative flex items-center gap-2 px-4 py-2 font-medium transition-colors duration-300 ${isActive
									? 'text-gold'
									: 'text-white/70 hover:text-white'
									}`}>
								<Icon className={`text-lg transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-gold' : 'group-hover:text-gold-light'}`} />
								<span className="relative">
									{label}
									<span className={`absolute -bottom-1 left-0 w-full h-px bg-[var(--theme-gold)] origin-center transition-transform duration-500 ease-out ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
								</span>
							</AppLink>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default DesktopNavbar;