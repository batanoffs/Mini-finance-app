import { Contact } from "./NavigationTabs/CallUs";
import { SettingsNavigationPanel } from "./NavigationPanel/SettingsNavigationPanel";
import { ProfileTab } from "./NavigationTabs/SettingsProfileTab";
import { PasswordTab } from "./NavigationTabs/SettingsPasswordTab";
import { NotificationTab } from "./NavigationTabs/SettingsNotificationTab";
import { Route, Routes } from "react-router-dom";
import { CreditCard } from "./NavigationTabs/SettingsCreditCardTab";
import { useContext } from "react";
import { UserDataContext } from "../../../contexts/UserDataContext";

export const SettingsTab = () => {
    const {name, phone, creditCard, picture, email} = useContext(UserDataContext);
    return (
        <div className="content-container">
            <div className="column">
                    <div className="title-group">
                        <h4 className="h4 mb-0">Настройки</h4>
                    </div>

                    <div className="row my-4">
                        <div className="col-lg-7 col-12">
                            <div className="custom-block bg-white">
                                <SettingsNavigationPanel />

                                <div className="tab-content" id="myTabContent">
                                    <Routes> 
                                    
                                        <Route path="profile" element={<ProfileTab name={name} email={email} phone={phone} picture={picture}/>} />
                                        <Route path="password" element={<PasswordTab />} />
                                        <Route path="notifications" element={<NotificationTab />} />
                                        <Route path="credit-card" element={<CreditCard name={name} creditCard={creditCard}/>} />
                                    </Routes>
                                    
                                </div>
                            </div>
                        </div>
            </div>
            </div>
            <div className="column">
                    <Contact />
            </div>
            
        </div>
    )
}