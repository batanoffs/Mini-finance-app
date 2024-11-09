import { ProfileCard, VirtualCard } from '../../../../components/cards'
import {
    AddFriends,
    ContactInfo,
    ExchangeRate,
    Greetings,
    History,
    LastTransactions,
    BankingActions,
    QuickSendMoney,
} from './assets'

export const OverviewTab = ({ styles }) => {
    return (
        <div className={styles.contentContainer}>
            <div className={styles.bentoMainColumn}>
                <Greetings />
                <ProfileCard />
                <VirtualCard />
                <ExchangeRate />
            </div>
            <div className={styles.bentoFillColumn}>
                <LastTransactions />
                <History />
            </div>

            <div className={styles.bentoSideColumn}>
                <ContactInfo />
                <AddFriends />
                <BankingActions />
                <QuickSendMoney />
            </div>
        </div>
    )
}
