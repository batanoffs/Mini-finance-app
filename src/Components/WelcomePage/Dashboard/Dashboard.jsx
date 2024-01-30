import { CreditCard } from "../OverviewTab/CreditCard.jsx";
import { History } from "../OverviewTab/History.jsx";
import { ExchangeRate } from "../OverviewTab/ExchangeRate.jsx";
import { ProfileDetails } from "../OverviewTab/ProfileDetails.jsx";
import { BankingActionButtons } from "../OverviewTab/BankingActionButtons.jsx";
import { Transactions } from "../OverviewTab/Transactions.jsx";
import { SendMoney } from "../OverviewTab/SendMoney.jsx";
import { Greetings } from "../OverviewTab/Greetings.jsx";
import { AuthContext } from "../../../contexts/AuthContext.jsx";
import { Contact } from "../SettingsTab/NavigationTabs/CallUs.jsx";
import { useContext } from "react";
import "./dashboard.css";

export const Dashboard = () => {
    const { name, creditCard, balance, picture, phone, email } =
        useContext(AuthContext);
    return (
        <div
            className="content-container"
            style={{ display: "flex", flexDirection: "column" }}
        >
            <div style={{ display: "flex" }}>
                <div className="bento-main-column">
                    <ExchangeRate />
                </div>
                <div className="bento-fill-column">
                    <Greetings name={name} />
                    <CreditCard
                        creditCard={creditCard}
                        name={name}
                        balance={balance}
                    />
                </div>
                <div className="bento-side-column">
                    <ProfileDetails
                        picture={picture}
                        name={name}
                        phone={phone}
                        email={email}
                    />
                    <BankingActionButtons />
                </div>
            </div>
            <div style={{ display: "flex" }}>
                <div className="bento-main-column" style={{ marginTop: "0em" }}>
                    <Transactions />
                </div>
                <div className="bento-fill-column" style={{ marginTop: "0em" }}>
                    <SendMoney />

                    <History />
                </div>
                <div className="bento-side-column" style={{ marginTop: "0em" }}>
                    <Contact />
                </div>
            </div>
        </div>
    );
};
