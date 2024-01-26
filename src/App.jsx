import { useState } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import { UserDataContext } from "./contexts/UserDataContext";
import { authService } from "./services/authService";
import { Header } from "./Components/Header/Header";
import { Login } from "./Components/LoginPage/Login";
import { WelcomePage } from "./Components/DashboardPage/WelcomePage";
import { Footer } from "./Components/Footer/Footer";
import { Home } from "./Components/HomePage/Home";
import { Register } from "./Components/RegisterPage/Register";
import { cardService } from "./services/cardService";

import { Result } from "antd";
// import Spline from '@splinetool/react-spline';

function App() {
    const [auth, setAuth] = useState({});
    const [userData, setUserData] = useState([]);
    const [cardData, setCardData] = useState({});
    const [loginError, setLoginError] = useState(false);
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
        try {
            const response = await authService.register({ ...formData });
            setAuth(response);

            window.alert("Successfully registered!");
        } catch (error) {
            console.log(error);
        }
    };

    const onLoginSubmitHandler = async (formData) => {
        const data = {
            login: formData.email,
            password: formData.password,
        };

        if (!data.login || !data.password) {
            return;
        }
        try {
            const response = await authService.login(data);
            const token = response["user-token"];
            const id = response.cardId;

            // Log the response in the console
            console.log(`Getting response from login:`);
            console.table(response);

            // Store the token in session storage
            sessionStorage.setItem("userData", token);
            setAuth(response);
            setUserData(response);
            navigate("/mini-finance/dashboard/overview");
            generateVirtualCard(id);
        } catch (error) {
            setLoginError(true);
        }
    };

    // ACTIVATE USER CARD IN DASHBOARD AFTER LOGIN

    const generateVirtualCard = async (id) => {
        try {
            const response = await cardService.generateCard(id);
            //set response data to setCardData
            setCardData(response);
            console.table(response);
        } catch (error) {
            console.log(error);
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
        country: userData.country,
        creditCard: cardData
            ? {
                  cardNumber: cardData.number,
                  expiryDate: cardData.expiration,
                  cvv: cardData.cvv,
                  cardHolder: cardData.number,
                  balance: cardData.balance,
                  issuer: cardData.issuer,
                  brand: cardData.brand,
                  cardId: cardData.objectId,
                  created: userData.created,
              }
            : {
                  cardNumber: `0000 0000 0000 0000`,
                  expiryDate: "00/00",
                  cvv: `000`,
                  cardHolder: `Липсва информация`,
                  created: Number(`00000000`),
                  balance: 0,
                  issuer: `Липсва информация`,
                  brand: `Липсва информация`,
                  cardId: `Липсва информация`,
              },
        picture:
            userData.profilePicture ||
            "https://lavishpart.backendless.app/api/files/userData/profile/picture/default.png",
        userId: userData.ownerId || "Липсва информация",
        transactions: userData.transactions || [],
        friends: userData.friends || [],
        email: userData.email || "Липсва информация",
        adress: userData.adress || "Липсва информация",
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
                            <Result
                                status="404"
                                title="Грешка 404, не е намерена страница."
                                subTitle="Страницата, която търсите не съществува."
                                extra={
                                    <Link
                                        to="/mini-finance/"
                                        className="button-primary"
                                    >
                                        Начална страница
                                    </Link>
                                }
                            />
                        }
                    />
                    <Route path="/mini-finance/" element={<Home />} />
                    <Route path="/mini-finance/login" element={<Login loginError={loginError} setLoginError={setLoginError}/>} />
                    <Route
                        path="/mini-finance/register/*"
                        element={<Register />}
                    />
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
