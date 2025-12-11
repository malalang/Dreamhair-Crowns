import Section from '@/components/ui/layout/Section';
import { IoLocationSharp, IoCall, IoMail } from 'react-icons/io5';

const ContactInfo: React.FC = () => {
	return (
		<Section tittle='Contact Information' >
			<div className='md:flex md:flex-wrap md:gap-4'>

				<article className='flex items-center  gap-2 p-4 '>

					<IoLocationSharp className='text-white w-10 h-10  ' />
					<p>
						<strong>Location:</strong> Evander, Mpumalanga, South Africa
					</p>
				</article>
				<article className='flex items-center  gap-2 p-2'>
					<IoCall className='text-white w-10 h-10  ' />
					<p>
						<strong>Phone Number:</strong> 083 588 7070
					</p>
				</article>
				<article className='flex items-center  gap-2 p-2'>
					<IoMail className='text-white w-10 h-10  ' />
					<p>
						<strong>Email Address:</strong> glendamahasha@icloud.com
					</p>
				</article>
			</div>
		</Section>
	);
};

export default ContactInfo;