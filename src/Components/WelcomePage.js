import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./DashboardPage/Dashboard";
import { ProfileTab } from "./DashboardPage/ProfileTab/Profile";
import { SettingsTab } from "./DashboardPage/SettingsTab/Settings";
import { HelpCenterTab } from "./DashboardPage/HelpCenterTab/HelpCenter";
import { MyWalletTab } from "./DashboardPage/MyWalletTab/Wallet";
import { Navbar } from "./Navbar";

export const WelcomePage = () => {
    return (
        <div className="container-fluid">
                <div className="row">
                        <main className="main-wrapper col-md-9 ms-sm-auto py-4 col-lg-9 px-md-4 border-start">    
                            <Navbar/> 
                                <Routes>                                
                                    <Route path="*" element={<Dashboard />} />
                                    <Route path="wallet" element={<MyWalletTab /> } />
                                    <Route path="profile" element={<ProfileTab />} />
                                    <Route path="settings/*" element={<SettingsTab />} />
                                    <Route path="help-center" element={<HelpCenterTab />}/>
                                </Routes>
                        </main>
                </div>
            </div>
    )
} 