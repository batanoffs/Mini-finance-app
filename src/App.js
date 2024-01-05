import { Header } from "./Components/Header";
import { LoginRegister } from "./Components/LoginPage/LoginRegister";
import { WelcomePage } from "./Components/WelcomePage";
import { Footer } from "./Components/Footer";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import { redirect } from "react-router-dom";

function App() {
    const BASE_LOGIN_URL = "https://parseapi.back4app.com/login";
    const BASE_REGISTER_URL = "https://parseapi.back4app.com/users";
    const [auth, setAuth] = useState({});
    const [records, setRecords] = useState([]);

    const onRegisterSubmitHandler = async (formData) => {
        if (formData.password !== formData.confirmPassword) {
            return;
        }
        try {
            const response = await fetch(BASE_REGISTER_URL, {
                method: "POST",
                headers: {
                    "X-Parse-Application-Id":
                        "J7d9KFz7D1pyPmJe073ZsK5stStJP5aD4dW4Fxoy",
                    "X-Parse-REST-API-Key":
                        "iVHSXY38Vg77ClZ1ooPr7bS2CzXS4xKmoQqXcUs4",
                    "X-Parse-Revocable-Session": "1",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            const token = data.sessionToken;
            const userId = data.objectId;
            sessionStorage.setItem("userData", token);
            

            // TO DO: Fix redirect
            if(response.status !== 404) { 
                console.log(response.status);               
                redirect(`dashboard/${userId}`);
            }
        } catch (error) {
            throw new Error(error);
        }
        setRecords([...records, formData]);      
    };

    
    const onLoginSubmitHandler = async (formData) => {        
    console.log(formData);
    const encodedUsername = encodeURI(formData.username);
    const encodedPassword = encodeURI(formData.password);
    const URI = BASE_LOGIN_URL + `?username=${encodedUsername}&password=${encodedPassword}`;

    try {
        const response = await fetch(URI, {
            method: "POST",
            headers: {
                "X-Parse-Application-Id":
                    "J7d9KFz7D1pyPmJe073ZsK5stStJP5aD4dW4Fxoy",
                "X-Parse-REST-API-Key":
                    "iVHSXY38Vg77ClZ1ooPr7bS2CzXS4xKmoQqXcUs4",
                "X-Parse-Revocable-Session": "1",
            },
        });
        const data = await response.json();
        const token = data.sessionToken;
        const userId = data.objectId;
        sessionStorage.setItem("userData", token);
        // TO DO:
        // setRecords([...records, formValues]);
        // setFormValues({
        //     username: "",
        //     email: "",
        //     password: "",
        //     confirmPassword: "",
        // });
        
        // TO DO: Fix redirect
        if(response.status !== 404) {
            console.log(response.status);
            redirect(`/dashboard/${userId}`);
        }
    } catch (error) {
        throw new Error(error);
    }        
};
    
    return ( 
        
        <AuthContext.Provider value={{onLoginSubmitHandler,onRegisterSubmitHandler}}>
            <Header />

            <Routes>
                <Route path="/*" element={<LoginRegister />} />
                <Route path="/dashboard/:userId" element={<WelcomePage />} />
            </Routes>

            <Footer />
        </AuthContext.Provider>
        
    );
}

export default App;