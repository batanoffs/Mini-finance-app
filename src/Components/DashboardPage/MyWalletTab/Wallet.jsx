import { BankingActionButtons } from "../OverviewTab/BankingActionButtons.jsx";
import { Transactions } from "../OverviewTab/Transactions.jsx";
import { CreditCard } from "../OverviewTab/CreditCard.jsx";
import "./wallet.css";
import { Table } from "./TableTransactions.js";

export const MyWalletTab = () => {
    return (
        <div className="content-container">
            <div className="bento-main-column">
                <Table />
            </div>
            <div className="bento-side-column">
                <Transactions />
                <BankingActionButtons />
            </div>

            {/* <div className="bento-fill-column">
               
            </div> */}
        </div>
    );
};
