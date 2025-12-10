import Image from 'next/image';
import '../components.css'; // Optional: for custom styles
import Main from './layout/Main';
import Section from './layout/Section';

const Loading = ({ message = 'Loading...' }: { message?: string }) => (
	<Main className='flex flex-col justify-center items-center min-h-screen  p-4' tittle='DREAMHAIR CROWNS' heading='Crown Yourself in Luxury.'>
		<Section className='flex flex-col items-center text-center max-w-md'>
			<div className='mt-8 animate-pulse'>
				<Image
					src='/PA_Logo.png'
					alt='Dreamhair Crowns Logo'
					width={220}
					height={220}
					className='w-48 h-48 mb-4'
					priority
				/>
			</div>
			<div className='spinner' />
			<p className='text-white font-semibold'>{message}</p>
		</Section>
	</Main>
);

export default Loading;