import { ProfileCard, VirtualCard } from '../../components/cards';
import { ContactInfo } from '../assets';
import { BentoGrid } from '../../layout';
import {
    AddFriends,
    ExchangeRate,
    Greetings,
    LastTransactions,
    BankingActions,
    QuickSendMoney,
} from './assets';

export const Dashboard = () => {
    return (
        <>
            <BentoGrid.Main>
                <Greetings />
                <ProfileCard />
                <VirtualCard />
                <ExchangeRate />
            </BentoGrid.Main>

            <BentoGrid.Fill>
                <LastTransactions />
            </BentoGrid.Fill>

            <BentoGrid.Aside>
                <ContactInfo />
                <AddFriends />
                <BankingActions />
                <QuickSendMoney />
            </BentoGrid.Aside>
        </>
    );
};
