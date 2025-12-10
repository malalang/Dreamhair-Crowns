import Section from '@/components/ui/layout/Section';
import { IoSparklesOutline, IoCheckmarkCircle } from 'react-icons/io5';

const KeyHighlights: React.FC = () => {
	const highlights = [
		{
			id: 1,
			text: 'Premium Quality: 100% Virgin Hair extensions and wigs sourced for longevity.',
		},
		{ id: 2, text: "Curated Style: Exclusive footwear and tools selected for the modern queen." },
		{
			id: 3,
			text: "Royal Service: We believe every customer deserves to feel like royalty.",
		},
	];

	return (
		<Section
			Icon={IoSparklesOutline}
			tittle='The Dreamhair Difference'>
			<div className=' grid md:grid-cols-2 gap-8'>
				{highlights.map((highlight) => (
					<div
						key={highlight.id}
						className='flex flex-col items-center'>
						<IoCheckmarkCircle className='text-4xl text-yellow-500 mb-3' />
						<p>{highlight.text}</p>
					</div>
				))}
			</div>
		</Section>
	);
};

export default KeyHighlights;