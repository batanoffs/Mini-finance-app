import { ProfileCard } from '../../../../components/cards';
import { Friends } from './assets/index';
import { ContactInfo } from '../overview/assets';
import { VirtualCardDetails } from './assets/VirtualCardDetails';

import 'react-credit-cards-2/dist/es/styles-compiled.css';
import styles from './profile-tab.module.css';

export const ProfileTab = () => {
    return (
        // <div className={styles.contentContainer}>
        <>
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
        </>
        // </div>
    );
};
