import { BankingActionButtons } from "../assets/BankingActionsButtons/BankingActionButtons.jsx";
import { LastTransactions } from "../assets/LastTransactions.jsx";
import { TableTransactions } from './assets/TableTransactions.js';

export const WalletTab = () => {
    return (
        <div className="content-container">
            <main className="bento-main-column">
                <TableTransactions/>
            </main>
            <aside className="bento-side-column" >
                <LastTransactions />
                <BankingActionButtons />
            </aside>
        </div>
    );
};
