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
import styles from "../welcome-page-layout.module.css"

export const OverviewTab = () => {
    const { name, virtualcard, balance, picture, phone, email } =
        useContext(AuthContext);
    return (
        <div className={styles.contentContainer} style={{ flexDirection: "column" }}>
            <div>
                <main className={styles.bentoMainColumn}>
                    <ExchangeRate />
                </main>
                <section className={styles.bentoFillColumn}>
                    <Greetings name={name} />
                    <VirtualCard
                        virtualcard={virtualcard}
                        name={name}
                        balance={balance}
                    />
                    <AddFriends />
                </section>
                <aside className={styles.bentoSideColumn}>
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
                <div className={styles.bentoMainColumn}>
                    <LastTransactions />
                </div>
                <div className={styles.bentoFillColumn}>
                    <History />
                </div>
                <div className={styles.bentoSideColumn}>
                    <SendMoney />
                    <ContactInfo />
                </div>
            </div>
        </div>
    );
};
