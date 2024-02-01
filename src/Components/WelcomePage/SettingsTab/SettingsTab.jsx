import { ContactInfo } from "../assets/ContactInfo";
import { SettingsNavigationPanel } from "./assets/SettingsNavigationPanel";
import "./settings-tab.css";

export const SettingsTab = () => {
    return (
        <div className="content-container">
            <div className="bento-main-column">
                <div className="custom-block bg-white">
                    <SettingsNavigationPanel />

                    {/* <div className="tab-content" id="myTabContent">
                        <Routes>
                            <Route
                                path="*"
                                element={
                                    <ProfileTab
                                        name={name}
                                        email={email}
                                        phone={phone}
                                        picture={picture}
                                    />
                                }
                            />
                            <Route path="password" element={<PasswordTab />} />
                            <Route
                                path="notifications"
                                element={<NotificationTab />}
                            />
                            <Route
                                path="credit-card"
                                element={
                                    <CreditCard
                                        name={name}
                                        creditCard={creditCard}
                                    />
                                }
                            />
                        </Routes>
                    </div> */}
                </div>
            </div>
            <div className="bento-side-column">
                <ContactInfo />
            </div>
        </div>
    );
};
