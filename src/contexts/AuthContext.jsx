import { createContext } from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { cardService } from "../services/cardGenetarionService";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { dataService } from "../services/userDataService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useSessionStorage(`auth`, {});
    const [loginError, setLoginError] = useState(false);
    const [avatar, setAvatar] = useState("https://notablepen.backendless.app/api/files/app/UserData/default.png");
    const navigate = useNavigate();
    let loginData;

    

    const onLoginSubmitHandler = async (formData) => {
        const data = {
            login: formData.email,
            password: formData.password,
        };

        if (!data.login || !data.password) {
            return false;
        }
        try {
            loginData = await authService.login(data);

            if (loginData.message === "Invalid login or password") {
                console.error(loginData.message);
                return false;
            }

            const token = loginData["user-token"];
            const ownerId = loginData["ownerId"];
            // Store the token in session storage
            sessionStorage.setItem("token", token);

            const userDataResponse = await dataService.getUserData(ownerId);

            if (userDataResponse === null) {
                throw new Error("userDataResponse is null");
            }

            if (userDataResponse.length === 0) {
                throw new Error("userDataResponse has no elements");
            }

            const card = userDataResponse[0].virtualcard[0];

            if (card === null) {
                throw new Error("card is null");
            }

            const userData = userDataResponse[0];

            userData.virtualcard = card;
            userData.email = loginData.email;

            setAuth(userData);
            setAvatar(userData.avatar);
            navigate("/dashboard/overview");
            return true;
        } catch (error) {
            console.error(error);
            setLoginError(true);
            return false;
        }
    };


    const onRegisterSubmitHandler = async (formData) => {
        if (
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword ||
            !formData.firstName ||
            !formData.lastName ||
            !formData.gender ||
            !formData.country ||
            !formData.phoneNumber ||
            !formData.virtualcard ||
            !formData.address ||
            !formData.town ||
            !formData.cardId
        ) {
            console.error("Null or empty value in formData");
            return false;
        }

        const registerData = {
            email: formData.email,
            password: formData.password,
        }
        try {
            const [registerResponse, setUserDataResponse, getCardResponse, setVirtualCardRelationResponse] = await Promise.all([
                authService.register({ ...registerData }),
                dataService.setUserData({
                    adress: formData.address,
                    cardId: formData.cardId,
                    country: formData.country,
                    gender: formData.gender,
                    fullName: formData.firstName + " " + formData.lastName,
                    phoneNumber: formData.phoneNumber,
                    town: formData.town,
                    ownerId: registerResponse["ownerId"],
                }),
                cardService.generateCard(formData.cardId),
                cardService.setVirtualCardRelation(setUserDataResponse.objectId, [getCardResponse.objectId])
            ]).then(([registerResponse, setUserDataResponse, getCardResponse, setVirtualCardRelationResponse]) => {
                if (!registerResponse || !setUserDataResponse || !getCardResponse || !setVirtualCardRelationResponse) {
                    throw new Error("Not all promises were fullfiled");
                }

                return [registerResponse, setUserDataResponse, getCardResponse, setVirtualCardRelationResponse];
            });

            navigate("/login");
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
        ownerId: auth.ownerId || "Липсва информация",
        token: sessionStorage.getItem("token") || "Липсва информация",
        email: auth.email || "Липсва информация",
        userStatus: auth.userStatus,
        isAuthenticated: () => sessionStorage.getItem("token"),
        name: auth.fullName || "потребител",
        phone: auth.phoneNumber || "номер",
        country: auth.country,
        virtualcard: auth.virtualcard || {
            number: `0000 0000 0000 0000`,
            expiration: "00/00",
            cvv: `000`,
            balance: Number(`00000000`),
            issuer: 0,
            brand: `Липсва информация`,
            objectId: `Липсва информация`,
            created: `информация`,
        },
        picture: auth.avatar || "https://notablepen.backendless.app/api/files/app/UserData/default.png",
        transactions: auth.transactions || [],
        friends: auth.friends || [],
        favorites: auth.favorite_friends || [],
        adress: auth.adress || "Липсва информация",
        userDataId: auth.objectId || "Липсва информация",
        setAuth: setAuth,
        auth: auth,
        setAvatar,
    };

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
