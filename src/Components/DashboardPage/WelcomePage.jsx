import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./dashboard/Dashboard";
import { ProfileTab } from "./ProfileTab/Profile";
import { SettingsTab } from "./SettingsTab/Settings";
import { HelpCenterTab } from "./HelpCenterTab/HelpCenter";
import { MyWalletTab } from "./MyWalletTab/Wallet";
import { Navbar } from "./SettingsTab/Navbar/Navbar";

export const WelcomePage = () => {
    return (        
            <div className="container-fluid">
                <div className="row">
                        <main className="main-wrapper col-md-9 ms-sm-auto py-0 col-lg-9 px-md-4 ">    
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