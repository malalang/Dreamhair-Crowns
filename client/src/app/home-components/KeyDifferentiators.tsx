import Icon from '@/components/ui/Icon';
import Section from '@/components/ui/layout/Section';
import React from 'react';
import { HiSparkles, HiShoppingBag } from 'react-icons/hi2';
import { RiVipCrownFill } from 'react-icons/ri';

const KeyDifferentiators: React.FC = () => {
	const items = [
		{
			icon: HiSparkles,
			title: 'Unmatched Quality',
			desc: 'Sourcing only the finest Brazilian hair extensions that stand the test of time and elevate your confidence.'
		},
		{
			icon: RiVipCrownFill,
			title: 'Curated Excellence',
			desc: 'Hand-picked high-end sandals and professional styling tools designed for the modern woman.'
		},
		{
			icon: HiShoppingBag,
			title: 'Seamless Shopping',
			desc: 'A fast, simple, and secure online shopping experience tailored for your convenience.'
		}
	];

	return (
		<Section tittle='The Luxe Difference' Icon={RiVipCrownFill}>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
				{items.map((item, idx) => (
					<article key={idx} className="group p-8 rounded-3xl bg-neutral-900/50 border border-white/5 hover:border-amber-500/30 hover:bg-white/5 transition-all duration-500 relative overflow-hidden">
						<div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-700">
							<item.icon className="text-9xl text-white" />
						</div>

						<div className="relative z-10 flex flex-col items-start h-full">
							<div className="p-4 rounded-2xl bg-amber-500/10 text-amber-500 mb-6 group-hover:scale-110 transition-transform duration-500 origin-left">
								<item.icon className="text-3xl" />
							</div>
							<h3 className="text-xl font-bold text-white mb-4 font-small-caps tracking-wide group-hover:text-amber-500 transition-colors">{item.title}</h3>
							<p className='text-white/60 leading-relaxed font-light'>{item.desc}</p>
						</div>
					</article>
				))}
			</div>
		</Section>
	);
};

export default KeyDifferentiators;