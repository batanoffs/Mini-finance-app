import "./register.css";
import { SidebarRegister } from "./SidebarRegister";
import { EmailForm } from "./EmailForm";
import { CardForm } from "./CardForm";
import { InfoForm } from "./InfoForm";
import { TermsForm } from "./TermsForm";
import { Routes, Route } from "react-router-dom";
import { ConfirmForm } from "./ConfirmForm";
import { useForm } from "../../hooks/useForm";
import { useState } from "react";

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
        creditCard: { cardNumber: "", cardHolder: "", expiryDate: "", cvv: "" },
        adress: "",
        town: "",
    });

    const [currentStep, setCurrentStep] = useState(0);

    const currentStepsHendler = (e) => {
        // e.preventDefault();

        if (e.target.name === "next") {
            setCurrentStep((prev) => prev + 1);
        }

        if (e.target.name === "prev") {
            setCurrentStep((prev) => prev - 1);
        }
    };

    return (
        <div className="content-container">
            <SidebarRegister currentStep={currentStep} />

            <Routes>
                <Route
                    path="/"
                    element={
                        <EmailForm
                            {...values}
                            currentStepsHendler={currentStepsHendler}
                            changeHandler={changeHandler}
                        />
                    }
                />
                <Route
                    path="/userinfo"
                    element={
                        <InfoForm
                            {...values}
                            currentStepsHendler={currentStepsHendler}
                            changeHandler={changeHandler}
                        />
                    }
                />
                <Route
                    path="/creditcard"
                    element={
                        <CardForm
                            creditCard={values.creditCard}
                            currentStepsHendler={currentStepsHendler}
                            changeHandler={changeHandler}
                        />
                    }
                />
                <Route
                    path="/terms"
                    element={
                        <TermsForm
                            {...values}
                            currentStepsHendler={currentStepsHendler}
                            changeHandler={changeHandler}
                        />
                    }
                />
                <Route
                    path="/confirm"
                    element={
                        <ConfirmForm
                            {...values}
                            changeHandler={changeHandler}
                            currentStepsHendler={currentStepsHendler}
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
