import { IoPeopleOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';
import Icon from '@/components/ui/Icon';
import Section from '@/components/ui/layout/Section';

const KeyLeadership: React.FC = () => {
	return (
		<Section
			tittle='Leadership'
			Icon={IoPeopleOutline}>

			<div className="flex flex-col lg:flex-row gap-12 items-start">
				<div className='group flex-shrink-0 w-full lg:w-1/3 bg-neutral-900 border border-white/5 rounded-3xl p-8 relative overflow-hidden'>
					<div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
					<div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center text-3xl font-bold text-amber-500 mb-6 border border-white/10">
						GM
					</div>
					<h3 className="text-2xl font-bold text-white font-small-caps tracking-wide mb-2">Glenda Mahasha</h3>
					<p className="text-amber-500 font-medium mb-6">Founder & Visionary</p>
					<p className="text-white/60 text-sm leading-relaxed">
						A visionary leader dedicated to redefining beauty standards. Glenda combines business acumen with a passion for luxury fashion to create Dreamhair Crowns.
					</p>
				</div>

				<div className='flex-grow'>
					<h4 className="text-xl font-bold text-white mb-6 font-small-caps tracking-wide">Areas of Expertise</h4>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						{[
							'Luxury Beauty Curation',
							'Brand Strategy',
							'Customer Experience',
							'Fashion Retail',
							'Business Management',
						].map((skill) => (
							<div
								key={skill}
								className='flex items-center gap-3 bg-white/5 border border-white/5 rounded-xl p-4 hover:border-amber-500/30 transition-colors'>
								<IoCheckmarkCircleOutline className='text-xl text-amber-500 flex-shrink-0' />
								<span className="text-white/80 text-sm font-medium">{skill}</span>
							</div>
						))}
					</div>
					<p className='mt-8 text-white/60 leading-relaxed font-light'>
						Glenda Mahasha&apos;s leadership is characterized by an uncompromising commitment to quality and elegance.
						Her vision for Dreamhair Crowns is to create a sanctuary where every customer can find the perfect crown to express their inner royalty.
					</p>
				</div>
			</div>
		</Section>
	);
};

export default KeyLeadership;