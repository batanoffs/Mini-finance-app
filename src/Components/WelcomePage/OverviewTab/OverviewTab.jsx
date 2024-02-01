import { CreditCard } from "../assets/CreditCard.jsx";
import { History } from "../assets/History.jsx";
import { ExchangeRate } from "../assets/ExchangeRate.jsx";
import { ProfileDetails } from "./assets/profileDetails/ProfileDetails.jsx";
import { BankingActionButtons } from "../assets/BankingActionsButtons/BankingActionButtons.jsx";
import { LastTransactions } from "../assets/LastTransactions.jsx";
import { SendMoney } from "../assets/SendMoney";
import { Greetings } from "./assets/Greetings.jsx";
import { AuthContext } from "../../../contexts/AuthContext.jsx";
import { ContactInfo } from "../assets/ContactInfo.jsx";
import { AddFriends } from "../assets/AddFriends/AddFriends.js";
import { useContext } from "react";
import "./overview-tab.css";

export const OverviewTab = () => {
    const { name, creditCard, balance, picture, phone, email } =
        useContext(AuthContext);
    return (
        <div className="content-container">
            <div>
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
                    <AddFriends />
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
            <div>
                <div className="bento-main-column">
                    <LastTransactions />
                </div>
                <div className="bento-fill-column">
                    <SendMoney />

                    <History />
                </div>
                <div className="bento-side-column">
                    <ContactInfo />
                </div>
            </div>
        </div>
    );
};
