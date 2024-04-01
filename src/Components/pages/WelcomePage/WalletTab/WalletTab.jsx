import { BankingActionButtons } from "../assets/BankingActionsButtons/BankingActionButtons";
import { TableTransactions } from "./assets/TableTransactions";
import { ContactInfo } from "../assets/ContactInfo";
import styles from "../welcome-page-layout.module.css";

export const WalletTab = (props) => {
    return (
        <div className={styles.contentContainer}>
            <main className={styles.bentoFillColumn}>
                <TableTransactions/>
            </main>
            <aside className={styles.bentoSideColumn}>
                <ContactInfo />
                <BankingActionButtons showModal={props.showModal} setShowModal={props.setShowModal} />
            </aside>
        </div>
    );
};
