import { Balance } from "./OverviewTab/Balance.js";
import { History } from "./OverviewTab/History.js";
import { ExchangeRate } from "./OverviewTab/ExchangeRate.js";
import { ProfileDetails } from "./OverviewTab/ProfileDetails.js";
import { BankingActionButtons } from "./OverviewTab/BankingActionButtons.js";
import { Transactions } from "./OverviewTab/Transactions.js";
import { SendMoney } from "./OverviewTab/SendMoney.js";
import { Greetings } from "./OverviewTab/Greetings.js";

export const Dashboard = () => {
    return (
        <div className="row my-4">
            <div className="col-lg-7 col-12">
                <Greetings />
                <Balance />
                <History />
                <ExchangeRate />
            </div>

            {/* user profile */}
            <div className="col-lg-5 col-12">

                <ProfileDetails />
                <BankingActionButtons />
                <Transactions />
                <SendMoney />
            </div>
        </div>
    )
} 