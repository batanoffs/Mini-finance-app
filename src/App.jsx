import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import { UserDataContext } from "./contexts/UserDataContext";
import { authService } from "./services/authService";
import { getUserData } from "./services/dataService";
import { Header } from "./Components/Header/Header";
import { Login } from "./Components/LoginPage/Login";
import { WelcomePage } from "./Components/DashboardPage/WelcomePage";
import { Footer } from "./Components/Footer/Footer";
import { Home } from "./Components/HomePage/Home";
import { Register } from "./Components/RegisterPage/Register";
// import Spline from '@splinetool/react-spline';

function App() {
    const [auth, setAuth] = useState({});
    const [userData, setUserData] = useState([]);
    const navigate = useNavigate();

    const onRegisterSubmitHandler = async (formData) => {
        if (
            !formData.email &&
            !formData.password &&
            !formData.confirmPassword &&
            !formData.firstName &&
            !formData.lastName &&
            !formData.gender &&
            !formData.country &&
            !formData.phoneNumber &&
            !formData.creditCard &&
            !formData.identity &&
            !formData.adress &&
            !formData.town
        ) {
            return;
        }
        console.log(formData);
        const response = await authService.register({ ...formData });
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
        navigate("/mini-finance/dashboard/overview");
        console.log(`Getting response from login:`);
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
        if (response.length > 0) {
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
        name: userData.fullName || "Липсва информация",
        phone: userData.phoneNumber || "Липсва информация",
        balance: userData.accountBalance || 0,
        creditCard: userData.creditCard
            ? userData.creditCard[0]
            : {
                  cardNumber: `0000 0000 0000 0000`,
                  expiryDate: "00/00",
                  cvv: `000`,
                  cardHolder: `Липсва информация`,
                  created: Number(`00000000`),
              },
        picture:
            userData.profilePicture ||
            "https://lavishpart.backendless.app/api/files/userData/profile/picture/default.png",
        userId: userData.ownerId || "Липсва информация",
        transactions: userData.transactions || [],
        friends: userData.friends || [],
        email: auth.email || "Липсва информация",
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
            <main>
                {/* <Spline scene="https://prod.spline.design/1RsSrFOp3UHWgR5n/scene.splinecode" /> */}
                <Routes>
                    <Route
                        path="*"
                        element={
                            <h2
                                style={{
                                    textAlign: "center",
                                    paddingTop: "20rem",
                                }}
                            >
                                Грешка 404 - Страницата не е намерена
                            </h2>
                        }
                    />
                    <Route path="/mini-finance/home" element={<Home />} />
                    <Route path="/mini-finance/login" element={<Login />} />
                    <Route path="/mini-finance/register/*" element={<Register />} />
                    <Route
                        path="/mini-finance/dashboard/*"
                        element={
                            <UserDataContext.Provider
                                value={{ ...userContext }}
                            >
                                <WelcomePage />
                            </UserDataContext.Provider>
                        }
                    />
                </Routes>
            </main>
            <Footer />
        </AuthContext.Provider>
    );
}

export default App;
