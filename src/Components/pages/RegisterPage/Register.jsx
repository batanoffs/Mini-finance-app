import { SidebarRegister } from "./assets/SidebarRegister";
import { EmailForm } from "./assets/EmailForm";
import { InfoForm } from "./assets/InfoForm";
import { TermsForm } from "./assets/TermsForm";
import { ConfirmForm } from "./assets/ConfirmForm";
import { Identity } from "./assets/Identity";
import { AuthContext } from "../../../contexts/AuthContext";
import { useForm } from "../../../hooks/useForm";
import { Routes, Route } from "react-router-dom";
import { useState, useContext } from "react";
import styles from "./register.module.css";

export const Register = () => {
    const { onRegisterSubmitHandler } = useContext(AuthContext);
    const [currentStep, setCurrentStep] = useState(0);
    const [check, setCheck] = useState(false);
    const { values, changeHandler, onSubmitRegister } = useForm(
        {
            email: "",
            password: "",
            confirmPassword: "",
            firstName: "",
            lastName: "",
            gender: "",
            country: "",
            phoneNumber: "",
            cardId: 0,
            adress: "",
            town: "",
        },
        null,
        onRegisterSubmitHandler
    );

    const termsCheckHandler = (e) => {
        setCheck(e.target.checked);
    };

    const currentStepsHandler = (e) => {
        if (e.target.name === "next") {
            setCurrentStep((prev) => prev + 1);
        }

        if (e.target.name === "prev") {
            setCurrentStep((prev) => prev - 1);
        }
    };

    

    return (
        <div className={styles.register_content_container}>
            <SidebarRegister currentStep={currentStep} />

            <Routes>
                <Route
                    path="/"
                    element={
                        <EmailForm
                            {...values}
                            currentStepsHandler={currentStepsHandler}
                            changeHandler={changeHandler}
                        />
                    }
                />
                <Route
                    path="/userinfo"
                    element={
                        <InfoForm
                            {...values}
                            currentStepsHandler={currentStepsHandler}
                            changeHandler={changeHandler}
                        />
                    }
                />
                <Route
                    path="/identity"
                    element={
                        <Identity
                            identity={values.identity}
                            currentStepsHandler={currentStepsHandler}
                            changeHandler={changeHandler}
                        />
                    }
                />
                <Route
                    path="/terms"
                    element={
                        <TermsForm
                            {...values}
                            currentStepsHandler={currentStepsHandler}
                            changeHandler={changeHandler}
                            check={check}
                            termsCheckHandler={termsCheckHandler}
                        />
                    }
                />
                <Route
                    path="/confirm"
                    element={
                        <ConfirmForm
                            {...values}
                            changeHandler={changeHandler}
                            onSubmitRegister={onSubmitRegister}
                            currentStepsHandler={currentStepsHandler}
                        />
                    }
                />
            </Routes>
        </div>
    );
};
