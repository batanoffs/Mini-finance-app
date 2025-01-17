import { ProfileCard } from '../../components/cards';
import { VirtualCardDetails, Friends } from './assets/index';
import { ContactInfo } from '../assets';
import { BentoGrid } from '../../layout';

export const Profile = () => {
    return (
        <>
            <BentoGrid.Main>
                <ProfileCard />
                <VirtualCardDetails />
            </BentoGrid.Main>

            <BentoGrid.Fill>
                <Friends />
            </BentoGrid.Fill>

            <BentoGrid.Aside>
                <ContactInfo />
            </BentoGrid.Aside>
        </>
    );
};
