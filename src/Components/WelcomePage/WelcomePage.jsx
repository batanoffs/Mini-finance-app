import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./Dashboard/Dashboard";
import { ProfileTab } from "./ProfileTab/Profile";
import { SettingsTab } from "./SettingsTab/Settings";
import { HelpCenterTab } from "./HelpCenterTab/HelpCenter";
import { MyWalletTab } from "./MyWalletTab/Wallet";
import { Upgrade } from "./Upgrade/Upgrade";
import { Sidebar } from "./Sidebar/Sidebar";

export const WelcomePage = () => {
    // const t = false // TODO
    return (
        <div className="main-wrapper">
            <Sidebar />
            <Routes>
                <Route path="/overview" element={<Dashboard />} />
                <Route path="/wallet" element={<MyWalletTab />} />
                <Route path="/profile" element={<ProfileTab />} />
                <Route path="/settings/*" element={<SettingsTab />} />
                <Route path="/help-center" element={<HelpCenterTab />} />
                <Route path="/upgrade" element={<Upgrade />} />
            </Routes>
        </div>
    );
};
