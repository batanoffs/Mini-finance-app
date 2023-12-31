import { Balance } from "./Balance.js";
import { History } from "./History.js";
import { ExchangeRate } from "./ExchangeRate.js";
import { ProfileDetails } from "./ProfileDetails.js";
import { ProfileActions } from "./ProfileActions.js";
import { Transactions } from "./Transactions.js";
import { SendMoney } from "./SendMoney.js";

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