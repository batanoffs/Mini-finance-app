import { Contact } from "./NavigationPanel/CallUs";
import { SettingsNavigationPanel } from "./NavigationPanel/SettingsNavigationPanel";
import { ProfileTab } from "./NavigationPanel/SettingsProfileTab";
import { PasswordTab } from "./NavigationPanel/SettingsPasswordTab";
import { NotificationTab } from "./NavigationPanel/SettingsNotificationTab";
import { Route, Routes } from "react-router-dom";

export const SettingsTab = () => {
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
                                        <Route path="*" element={<ProfileTab />} />
                                        <Route path="password" element={<PasswordTab />} />
                                        <Route path="notifications" element={<NotificationTab />} />
                                    </Routes>
                                    
                                </div>
                            </div>
                        </div>

                        <Contact />
                    </div>
        </>
    )
}