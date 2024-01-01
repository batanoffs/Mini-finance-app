import { Header } from "./Components/Header";
import { Navigation } from "./Components/Navigation";
import { Welcome } from "./Components/Welcome";
import { Footer } from "./Components/Footer";
import { Dashboard } from "./Components/Dashboard";
import { Routes, Route } from "react-router-dom";
import { ProfilePage } from "./Components/Navigation/Profile";
import { Settings } from "./Components/Navigation/Settings";
import { HelpCenter } from "./Components/Navigation/HelpCenter";
import { Wallet } from "./Components/Navigation/Wallet";

function App() {
    return (
        <>
            <Header />

            <div className="container-fluid">
                <div className="row">
                    <Navigation />
                    <main className="main-wrapper col-md-9 ms-sm-auto py-4 col-lg-9 px-md-4 border-start">
                        <Routes>
                            <Route
                                path="/dashboard"
                                element={
                                    <>
                                        <Welcome />
                                        <Dashboard />
                                    </>
                                }
                            />
                            <Route path="/profile" element={<ProfilePage />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="/wallet" element={<Wallet />} />
                            <Route path="/helpCenter" element={<HelpCenter />} />
                        </Routes>

                        <Footer />
                    </main>
                </div>
            </div>
        </>
    );
}

export default App;
