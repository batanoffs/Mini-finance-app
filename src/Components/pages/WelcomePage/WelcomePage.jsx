import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { OverviewTab } from "./OverviewTab/OverviewTab";
import { ProfileTab } from "./ProfileTab/ProfileTab";
import { SettingsTab } from "./SettingsTab/SettingsTab";
import { HelpCenterTab } from "./HelpCenterTab/HelpCenter";
import { WalletTab } from "./WalletTab/WalletTab";
import { Upgrade } from "./Upgrade/Upgrade";
import { Sidebar } from "./Sidebar/Sidebar";

import USLogo from "../../../images/flag/united-states.png";
import singaporeLogo from "../../../images/flag/singapore.png";
import UKLogo from "../../../images/flag/united-kingdom.png";
import australiaLogo from "../../../images/flag/australia.png";
import europeLogo from "../../../images/flag/european-union.png";

export const WelcomePage = () => {
    // const t = false // TODO

    const [hasLoaded, setHasLoaded] = useState(false);
    const [rates, setRates] = useState({
        USD: { name: "USD", buy: 0, sell: 0, logo: USLogo },
        GBP: { name: "GBP", buy: 0, sell: 0, logo: UKLogo },
        EUR: { name: "EUR", buy: 0, sell: 0, logo: europeLogo },
        AUD: { name: "AUD", buy: 0, sell: 0, logo: australiaLogo },
        SGD: { name: "SGD", buy: 0, sell: 0, logo: singaporeLogo },
    });

    return (
        <div className="main-wrapper">
            <Sidebar />
            <Routes>
                <Route path="/overview" element={<OverviewTab rates={rates} setRates={setRates} hasLoaded={hasLoaded} setHasLoaded={setHasLoaded}/>} />
                <Route path="/wallet" element={<WalletTab />} />
                <Route path="/profile" element={<ProfileTab />} />
                <Route path="/settings/*" element={<SettingsTab />} />
                <Route path="/help-center" element={<HelpCenterTab />} />
                <Route path="/upgrade" element={<Upgrade />} />
            </Routes>
        </div>
    );
};
