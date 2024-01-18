import "./register.css";
import { SidebarRegister } from "./SidebarRegister";
import { EmailForm } from "./EmailForm";
import { CardForm } from "./CardForm";
import { InfoForm } from "./InfoForm";
import { TermsForm } from "./TermsForm";
import { Routes, Route } from "react-router-dom";
import { ConfirmForm } from "./ConfirmForm";
import { useForm } from "../../hooks/useForm";

export const Register = () => {
    const { values, changeHandler } = useForm({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        gender: "",
        country: "",
        phoneNumber: "",
        creditCard: {cardNumber: "",  cardHolder: "",  expiryDate: "", cvv: ""},
        adress: "",
        town: "",
    });

    return (
        <div className="content-container">
            <SidebarRegister />

            <Routes>
                <Route
                    path="/"
                    element={
                        <EmailForm {...values}  changeHandler={changeHandler} />
                    }
                />
                <Route
                    path="/userinfo"
                    element={
                        <InfoForm {...values} changeHandler={changeHandler} />
                    }
                />
                <Route
                    path="/creditcard"
                    element={
                        <CardForm creditCard = {values.creditCard} changeHandler={changeHandler} />
                    }
                />
                <Route
                    path="/terms"
                    element={
                        <TermsForm {...values} changeHandler={changeHandler} />
                    }
                />
                <Route
                    path="/confirm"
                    element={
                        <ConfirmForm
                            {...values}
                            changeHandler={changeHandler}
                        />
                    }
                />
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
