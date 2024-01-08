import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import { UserDataContext } from "./contexts/UserDataContext";
import { authService } from "./services/authService";
import { getUserData } from "./services/dataService";
import { Header } from "./Components/Header";
import { LoginRegister } from "./Components/LoginPage/LoginRegister";
import { WelcomePage } from "./Components/WelcomePage";
import { Footer } from "./Components/Footer";

function App() {
    const [auth, setAuth] = useState({});
    const [userData, setUserData] = useState([]);
    const navigate = useNavigate();

    const onRegisterSubmitHandler = async (formData) => {
        if (formData.password !== formData.confirmPassword) {
            return;
        }
        const { email, password } = formData;
        const response = await authService.register({ email, password });
        setAuth(response);

        window.alert("Successfully registered!");
    };

    
    
    const onLoginSubmitHandler = async (formData) => {
        const data = {
            login: formData.email,
            password: formData.password,
        };

        const response = await authService.login(data);        
        setAuth(response);
        const token = response["user-token"];
        sessionStorage.setItem("userData", token);
        navigate("/dashboard");
        const id = response.objectId;
        userDataHandler(id);
    };

    
    const userDataHandler = async (id) => {
        if (!id) return new Error("User is not logged in");
        const response = await getUserData(id);
        console.log(response);
        setUserData(response[0]);
    };

    

    const onLogoutHandler = async () => {
        const token = sessionStorage.getItem("userData");
        await authService.logout(token);
        sessionStorage.removeItem("userData");
        setAuth("");
    };

   

    const userContext = {
        name: userData.fullName,
        phone: userData.phoneNumber,
        balance: userData.accountBalance,
        creditCard: userData.creditCard,
        picture: userData.profilePicture,
        userId: userData.ownerId,
        transactions: userData.transactions,
        friends: userData.friends,
        email: auth.email,
    };

    const context = {
        onLoginSubmitHandler,
        onRegisterSubmitHandler,
        onLogoutHandler,
        userId: auth.objectId,
        token: auth["user-token"],
        email: auth.email,
        userStatus: auth.userStatus,
        isAuthenticated() {
            return !!auth["user-token"];
        },
    };

    return (
        <AuthContext.Provider value={{ ...context }}>
            <Header />
            <Routes>
                <Route path="*" element={<h1>404</h1>} />
                <Route path="/" element={<LoginRegister />} />
                <Route
                    path="/dashboard/*"
                    element={
                        <UserDataContext.Provider value={{ ...userContext }}>
                            <WelcomePage />
                        </UserDataContext.Provider>
                    }
                />
            </Routes>
            <Footer />
        </AuthContext.Provider>
    );
}

export default App;
