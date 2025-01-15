import { useOutletContext } from 'react-router-dom';

import { ProfileCard } from '../../components/cards';
import { VirtualCardDetails, Friends } from './assets/index';
import { ContactInfo } from '../assets';

export const Profile = () => {
    const styles = useOutletContext();

    return (
        <div className={styles.contentContainer}>
            <section className={styles.bentoMainColumn}>
                <ProfileCard />
                <VirtualCardDetails />
            </section>
            <section className={styles.bentoFillColumn}>
                <Friends />
            </section>

            <aside className={styles.bentoSideColumn}>
                <ContactInfo />
            </aside>
        </div>
    );
};
