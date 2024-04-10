import { SettingsNavigationPanel } from './assets/SettingsNavigationPanel'

import { ContactInfo } from '../assets/ContactInfo'

import styles from '../welcome-page-layout.module.css'
import blocks from '../custom-block.module.css'

export const SettingsTab = () => {
    return (
        <div className={styles.contentContainer}>
            <main className={styles.bentoFillColumn}>
                <div className={blocks.customBlock}>
                    <SettingsNavigationPanel />
                </div>
            </main>

            <aside className={styles.bentoSideColumn}>
                <ContactInfo />
            </aside>
        </div>
    )
}
