import "./register.css";
import { AuthContext } from "../../contexts/AuthContext";
import { useState, useContext } from "react";
import { SidebarRegister } from "./SidebarRegister";
import { EmailForm } from "./EmailForm";
import { CardForm } from "./CardForm";
import { InfoForm } from "./InfoForm";
import { TermsForm } from "./TermsForm";
import { Routes, Route } from "react-router-dom";
import { ConfirmForm } from "./ConfirmForm";

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

    return (
        <div className="content-container">
            <SidebarRegister />

            <Routes>
                <Route path="/" element={<EmailForm />} />
                <Route path="/userinfo" element={<InfoForm />} />
                <Route path="/creditcard" element={<CardForm />} />
                <Route path="/terms" element={<TermsForm />} />
                <Route path="/confirm" element={<ConfirmForm />} />
            </Routes>
        </div>
    );
};

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
