import "./css/apexcharts.css";
import "./css/bootstrap-icons.css";
import "./css/bootstrap.min.css";
import "./css/tooplate-mini-finance.css";
import { Header } from "./Components/Header";
import { Navigation } from "./Components/Navigation";
import { Welcome } from "./Components/Welcome";
import { Balance } from "./Components/Balance";
import { History } from "./Components/History";
import { ExchangeRate } from "./Components/ExchangeRate";
import { ProfileDetails } from "./Components/ProfileDetails";
import { ProfileActions } from "./Components/ProfileActions";
import { Transactions } from "./Components/Transactions";
import { SendMoney } from "./Components/SendMoney";
import { Footer } from "./Components/Footer";

function App() {
    return (
        <>
            <Header />

            <div className="container-fluid">
                <div className="row">
                    <Navigation />
                    <main className="main-wrapper col-md-9 ms-sm-auto py-4 col-lg-9 px-md-4 border-start">
                        <Welcome />
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

                        <Footer />
                    </main>
                </div>
            </div>
        </>
    );
}

export default App;
