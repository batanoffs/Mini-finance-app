import { ContactInfo } from "../assets/ContactInfo";
import { SettingsNavigationPanel } from "./assets/SettingsNavigationPanel";
import "./settings-tab.css";

export const SettingsTab = () => {
    return (
        <div className="content-container">
            <main className="bento-main-column">
                <div className="custom-block bg-white">
                    <SettingsNavigationPanel />
                </div>
            </main>

            <aside className="bento-side-column">
                <ContactInfo />
            </aside>
        </div>
    );
};
