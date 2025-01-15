import { TableTransactions } from './assets/TableTransactions';
import { ContactInfo, BankingActions } from '../overview/assets';
import { useOutletContext } from 'react-router-dom';

export const WalletTab = () => {
    const styles = useOutletContext();

    return (
        <div className={styles.contentContainer}>
            <main className={styles.bentoFillColumn}>
                <TableTransactions />
            </main>
            <aside className={styles.bentoSideColumn}>
                <ContactInfo />
                <BankingActions />
            </aside>
        </div>
    );
};
