import { Header } from "./Components/Header";
import { LoginRegister } from "./Components/LoginPage/LoginRegister";
import { WelcomePage } from "./Components/WelcomePage";
import { Footer } from "./Components/Footer";

import { Routes, Route } from "react-router-dom";

// const Parse = require('parse');

function App() {
    return (
        <>
            <Header />

            <Routes>
                <Route path="/*" element={<LoginRegister />} />
                <Route path="/dashboard/*" element={<WelcomePage />} />
            </Routes>

            <Footer />
        </>
    );
}

export default App;
