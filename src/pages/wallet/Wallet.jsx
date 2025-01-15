import { useOutletContext } from 'react-router-dom';

import { TableTransactions } from './assets/TableTransactions';
import { BankingActions } from '../dashboard/assets';
import { ContactInfo } from '../assets';

export const Wallet = () => {
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
