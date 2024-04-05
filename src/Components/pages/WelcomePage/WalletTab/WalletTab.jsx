import { TableTransactions } from "./assets/TableTransactions";

import { BankingActionButtons } from "../assets/BankingActionsButtons/BankingActionButtons";
import { ContactInfo } from "../assets/ContactInfo";

import styles from "../welcome-page-layout.module.css";

export const WalletTab = (props) => {
    return (
        <div className={styles.contentContainer}>
            <main className={styles.bentoFillColumn}>
                <TableTransactions />
            </main>
            <aside className={styles.bentoSideColumn}>
                <ContactInfo />
                <BankingActionButtons showModal={props.showModal} userInput={props.userInput} setUserInput={props.setUserInput} setShowModal={props.setShowModal} />
            </aside>
        </div>
    );
};
