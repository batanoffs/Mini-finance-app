import "./register.css";
import { AuthContext } from "../../contexts/AuthContext";
import { useState, useContext } from "react";
import { SidebarRegister } from "./SidebarRegister";
import { EmailPassword } from './EmailPassword'
import { PersonalInfo } from "./PersonalInfo";


export const Register = () => {
    // const { onLoginSubmitHandler, onRegisterSubmitHandler } =
    // useContext(AuthContext);
    const [register, setRegister] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        gender: "",
        country: "",
        phoneNumber: "",
        creditCard: {},
    });

    // const {
    //     values,
    //     changeHandler,
    //     onSubmitLogin,
    //     resetFormHandler,
    //     onSubmitRegister,
    // } = useForm(
    //     {
    //         email: "",
    //         password: "",
    //         confirmPassword: "",
    //     },
    //     onLoginSubmitHandler,
    //     onRegisterSubmitHandler
    // );

    

    // const onFormChange = (e) => {
    //     if (!checked) {
    //         setChecked(true);
    //         resetFormHandler(e);
    //     } else {
    //         setChecked(false);
    //         resetFormHandler(e);
    //     }
    // };

    return (
        <div className="register-container">
            <SidebarRegister />

            <EmailPassword />

            {/* <PersonalInfo /> */}

        </div>
    );
};
