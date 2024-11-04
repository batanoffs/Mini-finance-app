import { Route, Routes } from 'react-router-dom'
import { HelpCenterTab, SettingsTab, OverviewTab, ProfileTab, WalletTab, Upgrade, Sidebar } from './tabs/index'

export const Dashboard = () => {
    return (
        <div className="main-wrapper">
            <Sidebar />

            <Routes>
                <Route path="/overview" element={<OverviewTab />} />
                <Route path="/wallet" element={<WalletTab />} />
                <Route path="/profile" element={<ProfileTab />} />
                <Route path="/settings/*" element={<SettingsTab />} />
                <Route path="/help-center" element={<HelpCenterTab />} />
                <Route path="/upgrade" element={<Upgrade />} />
            </Routes>
        </div>
    )
}
