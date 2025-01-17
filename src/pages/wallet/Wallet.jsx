import { TableTransactions } from './assets/TableTransactions';
import { BankingActions } from '../dashboard/assets';
import { ContactInfo } from '../assets';
import { BentoGrid } from '../../layout';

export const Wallet = () => {
    return (
        <>
            <BentoGrid.Fill>
                <TableTransactions />
            </BentoGrid.Fill>

            <BentoGrid.Aside>
                <ContactInfo />
                <BankingActions />
            </BentoGrid.Aside>
        </>
    );
};
