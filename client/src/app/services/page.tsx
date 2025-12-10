import FeaturedItemsServices from '../home-components/FeaturedItemsServices';
import Main from '@/components/ui/layout/Main';
import { HiBriefcase } from 'react-icons/hi2';

export default function ServicesPage() {
    return (
        <Main tittle="Our Services" Icon={HiBriefcase} heading="Experience the Royal Treatment">
            <FeaturedItemsServices />
        </Main>
    );
}

