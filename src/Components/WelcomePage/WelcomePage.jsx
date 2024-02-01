import { Route, Routes } from "react-router-dom";
import { OverviewTab } from "./OverviewTab/OverviewTab";
import { ProfileTab } from "./ProfileTab/ProfileTab";
import { SettingsTab } from "./SettingsTab/SettingsTab";
import { HelpCenterTab } from "./HelpCenterTab/HelpCenter";
import { WalletTab } from "./WalletTab/WalletTab";
import { Upgrade } from "./Upgrade/Upgrade";
import { Sidebar } from "./Sidebar/Sidebar";

export const WelcomePage = () => {
    // const t = false // TODO
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
    );
};
