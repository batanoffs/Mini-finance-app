import { BankingActionButtons } from "../assets/BankingActionsButtons/BankingActionButtons.jsx";
import { LastTransactions } from "../assets/LastTransactions.jsx";
import { TableTransactions } from './assets/TableTransactions.js';
import "./wallet-tab.css";

export const WalletTab = () => {
    return (
        <div className="content-container">
            <div className="bento-main-column">
                <TableTransactions style={{ }}/>
            </div>
            <div className="bento-side-column">
                <LastTransactions />
                <BankingActionButtons />
            </div>
        </div>
    );
};
