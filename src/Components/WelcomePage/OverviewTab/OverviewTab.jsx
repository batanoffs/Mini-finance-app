import { VirtualCard } from "../assets/VirtualCard.jsx";
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

export const OverviewTab = () => {
    const { name, virtualcard, balance, picture, phone, email } =
        useContext(AuthContext);
    return (
        <div className="content-container" style={{ flexDirection: "column" }}>
            <div>
                <main className="bento-main-column">
                    <ExchangeRate />
                </main>
                <section className="bento-fill-column">
                    <Greetings name={name} />
                    <VirtualCard
                        virtualcard={virtualcard}
                        name={name}
                        balance={balance}
                    />
                    <AddFriends />
                </section>
                <aside className="bento-side-column">
                    <ProfileDetails
                        picture={picture}
                        name={name}
                        phone={phone}
                        email={email}
                    />
                    <BankingActionButtons />
                </aside>
            </div>
            <div>
                <div className="bento-main-column">
                    <LastTransactions />
                </div>
                <div className="bento-fill-column">
                    <History />
                </div>
                <div className="bento-side-column">
                    <SendMoney />
                    <ContactInfo />
                </div>
            </div>
        </div>
    );
};
