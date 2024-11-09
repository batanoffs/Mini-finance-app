import { TableTransactions } from './assets/TableTransactions'
import { ContactInfo, BankingActions } from '../overview/assets'

export const WalletTab = ({ styles }) => {
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
    )
}
