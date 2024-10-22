import { SettingsNavigationPanel } from './assets/index'
import { ContactInfo } from '../../assets/ContactInfo'

import styles from '../../dashboard-layout.module.css'
import containers from '../../assets/containers.module.css'

export const SettingsTab = () => {
    return (
        <div className={styles.contentContainer}>
            <main className={styles.bentoFillColumn}>
                <div className={containers.customBlock}>
                    <SettingsNavigationPanel />
                </div>
            </main>

            <aside className={styles.bentoSideColumn}>
                <ContactInfo />
            </aside>
        </div>
    )
}
