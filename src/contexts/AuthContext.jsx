import { createContext } from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { cardService } from "../services/cardService";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { dataService } from "../services/userDataService";

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
            const ownerId = loginData["ownerId"];
            // Store the token in session storage
            sessionStorage.setItem("token", token);
            const userDataResponse = await dataService.getUserData(ownerId)
            const card = userDataResponse[0].virtualcard[0];
            userDataResponse[0]["virtualcard"] = card;
            userDataResponse[0]["email"] = loginData.email;
            console.log(`userData response:`);
            console.table(userDataResponse);
            setAuth(userDataResponse[0]);
            
            navigate("/dashboard/overview");
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
            !formData.virtualcard &&
            !formData.identity &&
            !formData.adress &&
            !formData.town &&
            !formData.cardId
        ) {
            return;
        }

        const registerData = {
            email: formData.email,
            password: formData.password,
        }
        try {
            const response = await authService.register({ ...registerData });
            console.log(`Register response:`);
            console.table(response);
            const ownerId = response["ownerId"];
            setAuth(response);

            // SET USER DATA
            const regUserData = {
                adress: formData.adress,
                cardId: formData.cardId,
                country: formData.country,
                gender: formData.gender,
                name: formData.firstName + " " + formData.lastName,
                phone: formData.phoneNumber,
                town: formData.town,
                ownerId: ownerId,
            }
            const setUserDataResponse = await dataService.setUserData(regUserData);
            const userDataObjectId = setUserDataResponse.objectId
            console.log(`Set user data response:`);
            console.table(setUserDataResponse);

            const getCard = await cardService.generateCard(formData.cardId);
            console.log(`Generated Card response:`);
            console.table(getCard);
            const cardObjectId = getCard.objectId
            const cardResponse = await cardService.setVirtualCardRelation(userDataObjectId, [cardObjectId]);
            console.log(`Set relation Card response:`);
            console.table(cardResponse);
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
        picture:
            auth.profilePicture ||
            "https://lavishpart.backendless.app/api/files/userData/profile/picture/default.png",
        transactions: auth.transactions || [],
        friends: auth.friends || [],
        adress: auth.adress || "Липсва информация",
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
