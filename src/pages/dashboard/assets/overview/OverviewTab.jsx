import { useOutletContext } from 'react-router-dom';
import { ProfileCard, VirtualCard } from '../../../../components/cards';
import {
    AddFriends,
    ContactInfo,
    ExchangeRate,
    Greetings,
    LastTransactions,
    BankingActions,
    QuickSendMoney,
} from './assets';

export const OverviewTab = () => {
    const styles = useOutletContext();
    
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
            </div>

            <div className={styles.bentoSideColumn}>
                <ContactInfo />
                <AddFriends />
                <BankingActions />
                <QuickSendMoney />
            </div>
        </div>
    );
};
