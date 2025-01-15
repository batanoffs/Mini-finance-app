import { SettingsNavigationPanel } from './assets/index';
import { ContactInfo } from '../overview/assets';

import styles from './user-settings-tab.module.css';

export const UserSettingsTab = () => {
    return (
        // <div className={styles.contentContainer}>
        <>
            <main className={styles.bentoFillColumn}>
                <div className={styles.customBlock}>
                    <SettingsNavigationPanel />
                </div>
            </main>

            <aside className={styles.bentoSideColumn}>
                <ContactInfo />
            </aside>
        </>
        // </div>
    );
};
