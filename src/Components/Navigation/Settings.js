import { Contact } from "../OverviewSection/Contact";
import { SettingsNavigationPanel } from "../OverviewSection/SettingsNavigationPanel";
import { ProfileTab } from "../OverviewSection/ProfileTab";
import { PasswordTab } from "../OverviewSection/PasswordTab";
import { NotificationTab } from "../OverviewSection/NotificationTab";
import { Route, Routes } from "react-router-dom";

export const Settings = () => {
    return (
        <>  
        <div className="title-group mb-3">
                        <h1 className="h2 mb-0">Settings</h1>
                    </div>

                    <div className="row my-4">
                        <div className="col-lg-7 col-12">
                            <div className="custom-block bg-white">
                                <SettingsNavigationPanel />

                                <div className="tab-content" id="myTabContent">
                                    <Routes> 
                                        <Route path="profile" element={<ProfileTab />} />
                                        <Route path="password" element={<PasswordTab />} />
                                        <Route path="notification" element={<NotificationTab />} />
                                    </Routes>
                                    
                                </div>
                            </div>
                        </div>

                        <Contact />
                    </div>
        </>
    )
}