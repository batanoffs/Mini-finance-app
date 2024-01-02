import { Header } from "./Components/Header";
import { Login } from "./Components/HomePage/Login";
import { WelcomePage } from "./Components/WelcomePage";
import { Footer } from "./Components/Footer";

import { Routes, Route } from "react-router-dom";


// const Parse = require('parse');

function App() {
    return (
        <>
            <Header />

            <Routes>
                <Route path="/*" element={<Login />} />
                <Route path="/dashboard/*" element={<WelcomePage />} />
            </Routes>
            
            <Footer />
            
        </>
    );
}

export default App;
