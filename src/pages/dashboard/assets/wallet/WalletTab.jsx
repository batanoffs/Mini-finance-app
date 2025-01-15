import { TableTransactions } from './assets/TableTransactions';
import { ContactInfo, BankingActions } from '../overview/assets';

import styles from './wallet-tab.module.css';

export const WalletTab = () => {
    return (
        // <div className={styles.contentContainer}>
        <>
            <main className={styles.bentoFillColumn}>
                <TableTransactions />
            </main>
            <aside className={styles.bentoSideColumn}>
                <ContactInfo />
                <BankingActions />
            </aside>
        </>
        // </div>
    );
};
