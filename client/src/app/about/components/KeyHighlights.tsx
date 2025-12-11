// components/KeyHighlights.tsx
import React from 'react';
import { IoBusiness, IoPricetag, IoCalendar } from 'react-icons/io5';
import Icon from '@/components/ui/Icon';
import Section from '@/components/ui/layout/Section';

const KeyHighlights = () => {
	return (
		<Section tittle='Why Choose Us' Icon={IoBusiness}>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
				{/* Highlight 1: Premium Quality */}
				<article className="p-8 rounded-3xl bg-neutral-900/50 border border-white/5 hover:border-amber-500/30 transition-all duration-500">
					<div className="flex items-center gap-4 mb-6">
						<div className="p-3 rounded-full bg-amber-500/10 text-amber-500">
							<IoBusiness className="text-2xl" />
						</div>
						<h3 className="text-lg font-bold text-white font-small-caps tracking-wide">Premium Quality</h3>
					</div>
					<p className='text-white/60 leading-relaxed font-light'>
						Dreamhair Crowns is your destination for 100% Virgin Hair, sourced to ensure longevity, volume, and natural shine.
					</p>
				</article>

				{/* Highlight 2: Exclusive Collections */}
				<article className="p-8 rounded-3xl bg-neutral-900/50 border border-white/5 hover:border-amber-500/30 transition-all duration-500">
					<div className="flex items-center gap-4 mb-6">
						<div className="p-3 rounded-full bg-amber-500/10 text-amber-500">
							<IoPricetag className="text-2xl" />
						</div>
						<h3 className="text-lg font-bold text-white font-small-caps tracking-wide">Exclusive Collections</h3>
					</div>
					<p className='text-white/60 leading-relaxed font-light'>
						From high-end sandals to professional styling tools, our curated collections are designed for the modern queen.
					</p>
				</article>

				{/* Highlight 3: Seamless Shopping */}
				<article className="p-8 rounded-3xl bg-neutral-900/50 border border-white/5 hover:border-amber-500/30 transition-all duration-500">
					<div className="flex items-center gap-4 mb-6">
						<div className="p-3 rounded-full bg-amber-500/10 text-amber-500">
							<IoCalendar className="text-2xl" />
						</div>
						<h3 className="text-lg font-bold text-white font-small-caps tracking-wide">Royal Treatment</h3>
					</div>
					<p className='text-white/60 leading-relaxed font-light'>
						Experience seamless online shopping with secure checkout and dedicated customer support fit for royalty.
					</p>
				</article>
			</div>
		</Section>
	);
};

export default KeyHighlights;