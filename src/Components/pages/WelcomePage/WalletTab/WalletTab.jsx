import { BankingActionButtons } from "../assets/BankingActionsButtons/BankingActionButtons";
import { LastTransactions } from "../assets/LastTransactions";
import { TableTransactions } from './assets/TableTransactions';
import styles from "../welcome-page-layout.module.css"


export const WalletTab = () => {
    return (
        <div className={styles.contentContainer}>
            <main className={styles.bentoMainColumn}>
                <TableTransactions/>
            </main>
            <aside className={styles.bentoSideColumn} >
                <LastTransactions />
                <BankingActionButtons />
            </aside>
        </div>
    );
};
