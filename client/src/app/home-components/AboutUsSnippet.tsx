import Icon from '@/components/ui/Icon';
import Section from '@/components/ui/layout/Section';
import AppLink from '@/components/ui/Link';
import { IoInformationCircleOutline } from 'react-icons/io5';

const AboutUsSnippet: React.FC = () => {
	return (
		<Section
			Icon={IoInformationCircleOutline}
			tittle='Our Love for Luxury'
			className="text-center"
			heading=''>
			<div className="flex flex-col items-center space-y-8">
				<p className="max-w-3xl mx-auto text-lg md:text-xl text-white/90 leading-relaxed font-light">
					Dreamhair Crowns is redefining the beauty industry by combining
					<span className="text-amber-400 font-medium"> premium quality hair </span>
					with
					<span className="text-amber-400 font-medium"> exclusive fashion curation</span>.
				</p>

				<div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl mt-12">
					<div className="group bg-neutral-900/50 border border-white/5 rounded-3xl p-8 hover:border-amber-500/30 hover:bg-white/5 transition-all duration-500 relative overflow-hidden">
						<div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
							<IoInformationCircleOutline className="text-8xl text-white" />
						</div>
						<h4 className="text-xl font-bold text-white mb-3 font-small-caps tracking-wide group-hover:text-amber-500 transition-colors">Premium Hair</h4>
						<p className="text-white/70 font-light leading-relaxed">
							Discover our collection of 100% Virgin Brazilian bundles and HD lace wigs, designed for volume, shine, and longevity.
						</p>
					</div>
					<div className="group bg-neutral-900/50 border border-white/5 rounded-3xl p-8 hover:border-amber-500/30 hover:bg-white/5 transition-all duration-500 relative overflow-hidden">
						<div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
							<IoInformationCircleOutline className="text-8xl text-white" />
						</div>
						<h4 className="text-xl font-bold text-white mb-3 font-small-caps tracking-wide group-hover:text-amber-500 transition-colors">Precision Styling</h4>
						<p className="text-white/70 font-light leading-relaxed">
							Maintain your crown at home with our professional-grade hot combs, straighteners, and dryers.
						</p>
					</div>
				</div>

				<div className='mt-8'>
					<AppLink
						variant='primary'
						href='/about'
						className="px-8 py-3 text-sm tracking-widest uppercase border border-amber-500/50 hover:bg-amber-500/10">
						Read Our Full Story
					</AppLink>
				</div>
			</div>
		</Section>
	);
};

export default AboutUsSnippet;