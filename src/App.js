import "./css/apexcharts.css";
import "./css/bootstrap-icons.css";
import "./css/bootstrap.min.css";
import "./css/tooplate-mini-finance.css";
import { Header } from "./Components/Header";
import { Navigation } from "./Components/Navigation";
import { Welcome } from "./Components/Welcome";
import { Footer } from "./Components/Footer";
import { Dashboard } from "./Components/Dashboard";

function App() {
    return (
        <>
            <Header />

            <div className="container-fluid">
                <div className="row">
                    <Navigation />
                    <main className="main-wrapper col-md-9 ms-sm-auto py-4 col-lg-9 px-md-4 border-start">
                        <Welcome />
                        <Dashboard />
                        <Footer />
                    </main>
                </div>
            </div>
        </>
    );
}

export default App;
