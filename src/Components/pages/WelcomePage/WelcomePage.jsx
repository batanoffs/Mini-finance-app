import { useState } from "react";
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
    const [showModal, setShowModal] = useState({
        topUp: false,
        send: false,
        receive: false,
    });
    const [hasLoaded, setHasLoaded] = useState(false);
    const [rates, setRates] = useState({
        USD: { name: "USD", buy: 0, sell: 0, logo: "https://notablepen.backendless.app/api/files/app/AppData/flags/united-states.png" },
        GBP: { name: "GBP", buy: 0, sell: 0, logo: "https://notablepen.backendless.app/api/files/app/AppData/flags/united-kingdom.png" },
        EUR: { name: "EUR", buy: 0, sell: 0, logo: "https://notablepen.backendless.app/api/files/app/AppData/flags/european-union.png" },
        AUD: { name: "AUD", buy: 0, sell: 0, logo: "https://notablepen.backendless.app/api/files/app/AppData/flags/australia.png" },
        SGD: { name: "SGD", buy: 0, sell: 0, logo: "https://notablepen.backendless.app/api/files/app/AppData/flags/singapore.png" },
    });

    return (
            <div className="main-wrapper">
                    <Sidebar />
                
                    <Routes>
                        <Route path="/overview" element={<OverviewTab showModal={showModal} setShowModal={setShowModal} rates={rates} setRates={setRates} hasLoaded={hasLoaded} setHasLoaded={setHasLoaded}/>} />
                        <Route path="/wallet" element={<WalletTab showModal={showModal} setShowModal={setShowModal}/>} />
                        <Route path="/profile" element={<ProfileTab />} />
                        <Route path="/settings/*" element={<SettingsTab />} />
                        <Route path="/help-center" element={<HelpCenterTab />} />
                        <Route path="/upgrade" element={<Upgrade />} />
                    </Routes>
            </div>
    );
};
