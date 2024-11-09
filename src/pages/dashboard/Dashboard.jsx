import { Route, Routes } from 'react-router-dom'
import { HelpCenterTab, OverviewTab, ProfileTab, UserSettingsTab, Upgrade, WalletTab, Sidebar } from './assets/index'

import styles from './dashboard-layout.module.css'

export const Dashboard = () => {
    return (
        <div className="main-wrapper">
            <Sidebar />

            <Routes>
                <Route path="/overview" element={<OverviewTab styles={styles} />} />
                <Route path="/wallet" element={<WalletTab styles={styles} />} />
                <Route path="/profile" element={<ProfileTab styles={styles} />} />
                <Route path="/settings/*" element={<UserSettingsTab styles={styles} />} />
                <Route path="/help-center" element={<HelpCenterTab styles={styles} />} />
                <Route path="/upgrade" element={<Upgrade styles={styles} />} />
            </Routes>
        </div>
    )
}
