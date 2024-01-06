import { Header } from "./Components/Header";
import { LoginRegister } from "./Components/LoginPage/LoginRegister";
import { WelcomePage } from "./Components/WelcomePage";
import { Footer } from "./Components/Footer";
import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import { authService } from "./services/authService";

function App() {
    const [auth, setAuth] = useState({});
    const [records, setRecords] = useState([]);
    const navigate = useNavigate();

    const onRegisterSubmitHandler = async (formData) => {
        if (formData.password !== formData.confirmPassword) {
            return;
        }
        const { email, password } = formData;
        const response = await authService.register({ email, password });
        console.log(response);

        setRecords([...records, formData]); 
        setAuth(response);

        window.alert("Successfully registered!");
    };

    
    const onLoginSubmitHandler = async (formData) => {
        const data = {
            "login": formData.email,
            "password": formData.password,
        };

        const response = await authService.login(data);
        setAuth(response);
        const token = response["user-token"];
        console.log(token);
        sessionStorage.setItem("userData", token);
        navigate(`/dashboard`);
    };

    const context = {
        onLoginSubmitHandler,
        onRegisterSubmitHandler,
        userId: auth.objectId,
        token: auth["user-token"],
        email: auth.email,
        userStatus: auth.userStatus,
        isAuthenticated() {
            return !!auth["user-token"];
        },
    };
        
    return (         
        <AuthContext.Provider value={{...context}}>
            <Header />

            <Routes>
                <Route path='*' element={<h1>404</h1>} />
                <Route path="/" element={<LoginRegister />} />
                <Route path="/dashboard/*" element={<WelcomePage />} />
            </Routes>

            <Footer />
        </AuthContext.Provider>        
    );
}

export default App;