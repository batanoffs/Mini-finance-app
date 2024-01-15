import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./dashboard/Dashboard";
import { ProfileTab } from "./ProfileTab/Profile";
import { SettingsTab } from "./SettingsTab/Settings";
import { HelpCenterTab } from "./HelpCenterTab/HelpCenter";
import { MyWalletTab } from "./MyWalletTab/Wallet";
import { Sidebar } from "./Sidebar/Sidebar";

export const WelcomePage = () => {
    return (
            <div className="content-wrapper">
                <main className="main-wrapper">
                    <Sidebar />
                    <Routes>
                        <Route path="/*" element={<Dashboard />} />
                        <Route path="wallet" element={<MyWalletTab />} />
                        <Route path="profile" element={<ProfileTab />} />
                        <Route path="settings/*" element={<SettingsTab />} />
                        <Route path="help-center" element={<HelpCenterTab />} />
                    </Routes>
                </main>
            </div>
    );
};
