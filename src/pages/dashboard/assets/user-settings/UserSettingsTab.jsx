import { SettingsNavigationPanel } from './assets/index'
import { ContactInfo } from '../overview/assets'

import containers from './user-settings-tab.module.css'

export const UserSettingsTab = ({ styles }) => {
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
