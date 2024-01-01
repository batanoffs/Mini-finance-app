import { Balance } from "./DashboardPage/Balance.js";
import { History } from "./DashboardPage/History.js";
import { ExchangeRate } from "./DashboardPage/ExchangeRate.js";
import { ProfileDetails } from "./DashboardPage/ProfileDetails.js";
import { ProfileActions } from "./DashboardPage/ProfileActions.js";
import { Transactions } from "./DashboardPage/Transactions.js";
import { SendMoney } from "./DashboardPage/SendMoney.js";

export const Dashboard = () => {
    return (
        <div className="row my-4">
            <div className="col-lg-7 col-12">
                <Balance />
                <History />
                <ExchangeRate />
            </div>

            {/* user profile */}
            <div className="col-lg-5 col-12">
                <ProfileDetails />
                <ProfileActions />
                <Transactions />
                <SendMoney />
            </div>
        </div>
    )
} 