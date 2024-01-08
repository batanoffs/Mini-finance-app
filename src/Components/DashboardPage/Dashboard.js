import { Balance } from "./OverviewTab/Balance.js";
import { History } from "./OverviewTab/History.js";
import { ExchangeRate } from "./OverviewTab/ExchangeRate.js";
import { ProfileDetails } from "./OverviewTab/ProfileDetails.js";
import { BankingActionButtons } from "./OverviewTab/BankingActionButtons.js";
import { Transactions } from "./OverviewTab/Transactions.js";
import { SendMoney } from "./OverviewTab/SendMoney.js";
import { Greetings } from "./OverviewTab/Greetings.js";
import { useContext } from "react";
import { UserDataContext } from "../../contexts/UserDataContext.js";

export const Dashboard = () => {
    // // const [ userData, setData ] = useState();
    // const {name, phone, balance, creditCard, picture, userId, email, transactions, friends} = useContext(UserDataContext);
    // console.log(name);
    const {name, creditCard, balance, picture, phone, email} = useContext(UserDataContext);
    return (
        <div className="row my-4">
            <div className="col-lg-7 col-12">
                <Greetings name={name}/>
                <Balance creditCard={creditCard[0]} name={name} balance={balance}/>
                <History />
                <ExchangeRate />
            </div>

            {/* user profile */}
            <div className="col-lg-5 col-12">
                <ProfileDetails picture={picture} name={name} phone={phone} email={email}/>
                <BankingActionButtons />
                <Transactions />
                <SendMoney />
            </div>
        </div>
    );
};
