import { useOutletContext } from 'react-router-dom';
import { ProfileCard, VirtualCard } from '../../components/cards';
import { ContactInfo } from '../assets';
import {
    AddFriends,
    ExchangeRate,
    Greetings,
    LastTransactions,
    BankingActions,
    QuickSendMoney,
} from './assets';

export const Dashboard = () => {
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
