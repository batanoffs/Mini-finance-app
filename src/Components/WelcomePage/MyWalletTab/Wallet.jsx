import { BankingActionButtons } from "../OverviewTab/BankingActionButtons.jsx";
import { Transactions } from "../OverviewTab/Transactions.jsx";
import { CreditCard } from "../OverviewTab/CreditCard.jsx";
import "./wallet.css";
import { TransactionsTable } from "./Transactions.js";
import { Table } from "./TableTransactions.js"

export const MyWalletTab = () => {
    return (
        <div className="content-container">
            <div className="bento-main-column">
                <TransactionsTable style={{ }}/>
            </div>
            <div className="bento-side-column">
                <Transactions />
                <BankingActionButtons />
            </div>
        </div>
    );
};
