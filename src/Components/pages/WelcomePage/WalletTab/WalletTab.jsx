import { BankingActionButtons } from "../assets/BankingActionsButtons/BankingActionButtons";
import { LastTransactions } from "../assets/LastTransactions";
import { TableTransactions } from "./assets/TableTransactions";
import { ContactInfo } from "../assets/ContactInfo";
import styles from "../welcome-page-layout.module.css";

export const WalletTab = () => {
    return (
        <div className={styles.contentContainer}>
            <main className={styles.bentoFillColumn}>
                <TableTransactions />
                <LastTransactions />

            </main>
            <aside className={styles.bentoSideColumn}>
                <ContactInfo />
                <BankingActionButtons />
            </aside>
        </div>
    );
};
