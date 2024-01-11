import { Contact } from "./NavigationPanel/CallUs";
import { SettingsNavigationPanel } from "./NavigationPanel/SettingsNavigationPanel";
import { ProfileTab } from "./NavigationPanel/SettingsProfileTab";
import { PasswordTab } from "./NavigationPanel/SettingsPasswordTab";
import { NotificationTab } from "./NavigationPanel/SettingsNotificationTab";
import { Route, Routes } from "react-router-dom";
import { CreditCard } from "./NavigationPanel/SettingsCreditCardTab";
import { useContext } from "react";
import { UserDataContext } from "../../../contexts/UserDataContext";

export const SettingsTab = () => {
    const {name, phone, creditCard, picture, email} = useContext(UserDataContext);
    return (
        <>  
        <div className="title-group mb-3 mt-4">
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

                        <Contact />
                    </div>
        </>
    )
}