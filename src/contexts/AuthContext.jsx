import { createContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { cardService } from "../services/cardService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [userData, setUserData] = useState([]);
    const [cardData, setCardData] = useState({});
    const [loginError, setLoginError] = useState(false);
    const navigate = useNavigate();

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

    const onLogoutHandler = async () => {
        const token = sessionStorage.getItem("userData");
        await authService.logout(token);
        sessionStorage.removeItem("userData");
        setAuth("");
        setUserData("");
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

    const authDataContext = {
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

    // check if userData is null or not
    const userContext = {
        name: userData.fullName || "потребител",
        phone: userData.phoneNumber || "номер",
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

    return (
        <>
            <AuthContext.Provider value={{ ...userContext, ...authDataContext, loginError, setLoginError }}> 
                {children}
            </AuthContext.Provider>
        </>
    );
};