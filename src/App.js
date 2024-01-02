import { Header } from "./Components/Header";
import { Navbar } from "./Components/Navigation";
import { Welcome } from "./Components/Welcome";
import { Footer } from "./Components/Footer";
import { Dashboard } from "./Components/Dashboard";
import { Routes, Route } from "react-router-dom";
import { ProfilePage } from "./Components/SettingsNavbar/Profile";
import { Settings } from "./Components/SettingsNavbar/Settings";
import { HelpCenter } from "./Components/SettingsNavbar/HelpCenter";
import { Wallet } from "./Components/SettingsNavbar/Wallet";
import { Login } from "./Components/HomePage/Login";

// const Parse = require('parse');

function App() {
    return (
        <>
            <Login>
                <Header />

                <div className="container-fluid">
                    <div className="row">
                        <Navbar />
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
                                <Route
                                    path="/profile"
                                    element={<ProfilePage />}
                                />
                                <Route
                                    path="/settings/*"
                                    element={<Settings />}
                                />
                                <Route path="/wallet" element={<Wallet />} />
                                <Route
                                    path="/helpCenter"
                                    element={<HelpCenter />}
                                />
                            </Routes>

                            <Footer />
                        </main>
                    </div>
                </div>
            </Login>
        </>
    );
}

export default App;
