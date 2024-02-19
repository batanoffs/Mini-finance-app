import { VirtualCard } from "../assets/VirtualCard";
import { History } from "../assets/History";
import { ExchangeRate } from "../assets/ExchangeRate";
import { ProfileDetails } from "./assets/profileDetails/ProfileDetails";
import { BankingActionButtons } from "../assets/BankingActionsButtons/BankingActionButtons";
import { LastTransactions } from "../assets/LastTransactions";
import { SendMoney } from "../assets/SendMoney";
import { Greetings } from "./assets/Greetings";
import { AuthContext } from "../../../../contexts/AuthContext";
import { ContactInfo } from "../assets/ContactInfo";
import { AddFriends } from "../assets/AddFriends";
import { useContext } from "react";
import styles from "../welcome-page-layout.module.css";

export const OverviewTab = () => {
    const { name, virtualcard, balance, picture, phone, email } =
        useContext(AuthContext);
    return (
        <div className={styles.contentContainer}>
            <div className={styles.bentoMainColumn}>
                <Greetings name={name} />
                <VirtualCard
                    virtualcard={virtualcard}
                    name={name}
                    balance={balance}
                />

                <BankingActionButtons />

                <ProfileDetails
                    picture={picture}
                    name={name}
                    phone={phone}
                    email={email}
                />
                <SendMoney />


            </div>
            <div className={styles.bentoFillColumn}>
                <ExchangeRate />
                <LastTransactions />
            </div>

            <div className={styles.bentoSideColumn}>
                <History />
                <AddFriends />

                <ContactInfo />
            </div>
        </div>
    );
};
