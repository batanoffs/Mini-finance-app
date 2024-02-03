import { createContext } from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { cardService } from "../services/cardService";
import { useSessionStorage } from "../hooks/useSessionStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useSessionStorage(`auth`, {});
    const [loginError, setLoginError] = useState(false);
    const navigate = useNavigate();
    let loginData;

    const onLoginSubmitHandler = async (formData) => {
        const data = {
            login: formData.email,
            password: formData.password,
        };

        if (!data.login || !data.password) {
            return;
        }
        try {
            loginData = await authService.login(data);
            const token = loginData["user-token"];
            // Store the token in session storage
            sessionStorage.setItem("token", token);
            navigate("/dashboard/overview");
            generateVirtualCard(loginData.cardId);
        } catch (error) {
            setLoginError(true);
        }
    };

    // ACTIVATE USER CARD IN DASHBOARD AFTER LOGIN
    const generateVirtualCard = async (id) => {
        try {
            const response = await cardService.generateCard(id);
            loginData["creditCard"] = response;
            setAuth(loginData);
        } catch (error) {
            console.log(error);
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
        const token = sessionStorage.getItem("token");
        await authService.logout(token);
        sessionStorage.removeItem("token");
        setAuth({});
        sessionStorage.removeItem("auth");
    };

    const authDataContext = {
        onLoginSubmitHandler,
        onRegisterSubmitHandler,
        onLogoutHandler,
        userId: auth.ownerId || "Липсва информация",
        token: auth["user-token"],
        email: auth.email || "Липсва информация",
        userStatus: auth.userStatus,
        isAuthenticated: () =>!!auth["user-token"],
        name: auth.fullName || "потребител",
        phone: auth.phoneNumber || "номер",
        country: auth.country,
        creditCard: auth.creditCard || {
            number: `0000 0000 0000 0000`,
            expiration: "00/00",
            cvv: `000`,
            balance: Number(`00000000`),
            issuer: 0,
            brand: `Липсва информация`,
            objectId: `Липсва информация`,
            created: `информация`,
        },

        // {
        //     number: auth.creditCard.number || `0000 0000 0000 0000`,
        //     expiration: auth.creditCard.expiration || "00/00",
        //     cvv: auth.creditCard.cvv || `000`,
        //     cardHolder: auth.fullName || `Липсва информация`,
        //     balance: auth.creditCard.balance || Number(`00000000`),
        //     issuer: auth.creditCard.issuer || 0,
        //     brand: auth.creditCard.brand || `Липсва информация`,
        //     objectId: auth.creditCard.objectId || `Липсва информация`,
        //     created: auth.created || `Липсва информация`,
        // }

        picture:
            auth.profilePicture ||
            "https://lavishpart.backendless.app/api/files/userData/profile/picture/default.png",
        transactions: auth.transactions || [],
        friends: auth.friends || [],
        adress: auth.adress || "Липсва информация",
    };

    // const userContext = {
    //     name: userData.fullName || "потребител",
    //     phone: userData.phoneNumber || "номер",
    //     balance: userData.accountBalance || 0,
    //     country: userData.country,
    //     creditCard: cardData
    //         ? {
    //               cardNumber: cardData.number,
    //               expiryDate: cardData.expiration,
    //               cvv: cardData.cvv,
    //               cardHolder: cardData.number,
    //               balance: cardData.balance,
    //               issuer: cardData.issuer,
    //               brand: cardData.brand,
    //               cardId: cardData.objectId,
    //               created: userData.created,
    //           }
    //         : {
    //               cardNumber: `0000 0000 0000 0000`,
    //               expiryDate: "00/00",
    //               cvv: `000`,
    //               cardHolder: `Липсва информация`,
    //               created: Number(`00000000`),
    //               balance: 0,
    //               issuer: `Липсва информация`,
    //               brand: `Липсва информация`,
    //               cardId: `Липсва информация`,
    //           },
    //           picture:
    //         userData.profilePicture ||
    //         "https://lavishpart.backendless.app/api/files/userData/profile/picture/default.png",
    //     userId: userData.ownerId || "Липсва информация",
    //     transactions: userData.transactions || [],
    //     friends: userData.friends || [],
    //     email: userData.email || "Липсва информация",
    //     adress: userData.adress || "Липсва информация",
    // };

    return (
        <>
            <AuthContext.Provider
                value={{ ...authDataContext, loginError, setLoginError }}
            >
                {children}
            </AuthContext.Provider>
        </>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    return context;
};
