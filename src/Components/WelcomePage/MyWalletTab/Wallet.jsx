import { BankingActionButtons } from "../OverviewTab/BankingActionButtons.jsx";
import { Transactions } from "../OverviewTab/Transactions.jsx";
import { TransactionsTable } from "./Transactions.js";
import "./wallet.css";

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
