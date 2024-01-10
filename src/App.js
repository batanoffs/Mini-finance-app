import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import { UserDataContext } from "./contexts/UserDataContext";
import { authService } from "./services/authService";
import { getUserData } from "./services/dataService";
import { Header } from "./Components/Header/Header";
import { LoginRegister } from "./Components/LoginPage/LoginRegister";
import { WelcomePage } from "./Components/DashboardPage/WelcomePage";
import { Footer } from "./Components/Footer/Footer";
import { Home } from "./Components/HomePage/Home";
// import Spline from '@splinetool/react-spline';
function App() {
    const [auth, setAuth] = useState({});
    const [userData, setUserData] = useState([]);
    const navigate = useNavigate();

    const onRegisterSubmitHandler = async (formData) => {
        if (!formData.email || !formData.password || !formData.confirmPassword) {
            return;
        }
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

        if (!data.login || !data.password) {
            return;
        }

        const response = await authService.login(data);        
        setAuth(response);
        const token = response["user-token"];
        sessionStorage.setItem("userData", token);
        navigate("/dashboard");
        console.log(`Getting response from login:`)
        console.table(response);
        console.log(response);
        const id = response.ownerId;
        console.log(`Getting id from auth.ownerId ${auth.ownerId}`);
        userDataHandler(id);
    };
    
    const userDataHandler = async (id) => {
        if (!id) return new Error("User is not logged in");
        const response = await getUserData(id);
        console.log(`Fetching user data with id:${id}`);
        console.log(response);
        if(response.length > 0) {
            setUserData(response[0]);
        } else {
            setUserData([]);
        }
    };

    const onLogoutHandler = async () => {
        const token = sessionStorage.getItem("userData");
        await authService.logout(token);
        sessionStorage.removeItem("userData");
        setAuth("");
        setUserData("");
    };

    // check if userData is null or not
    const userContext = {
        name: userData.fullName || "New user",
        phone: userData.phoneNumber || "No number",
        balance: userData.accountBalance || 0,
        creditCard: userData.creditCard ? userData.creditCard[0] : {cardNumber: `0000 0000 0000 0000`, expiryDate: "00/00", cvc: `000`, name : `New user`, created: Number(`00000000`)},
        picture: userData.profilePicture || "https://lavishpart.backendless.app/api/files/userData/profile/picture/default.png",
        userId: userData.ownerId || null,
        transactions: userData.transactions || [],
        friends: userData.friends || [],
        email: auth.email || "No email",
    };

    const context = {
        onLoginSubmitHandler,
        onRegisterSubmitHandler,
        onLogoutHandler,
        userId: auth.ownerId,
        token: auth["user-token"],
        email: auth.email,
        userStatus: auth.userStatus,
        isAuthenticated() {
            return !!auth["user-token"];
        },
    };

    return (
        <AuthContext.Provider value={{ ...context }}>
            <Header picture={userContext.picture} />
            {/* <Spline scene="https://prod.spline.design/1RsSrFOp3UHWgR5n/scene.splinecode" /> */}
            <Routes>
                <Route path="*" element={<h1>Error 404 Page not found</h1>} />
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginRegister />} />
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
