import React from "react";
import { SidebarRegister } from "./assets/SidebarRegister";
import { InfoForm } from "./assets/InfoForm";
import { TermsForm } from "./assets/TermsForm";
import { ConfirmForm } from "./assets/ConfirmForm";
import { AuthContext } from "../../../contexts/AuthContext";
import { useForm } from "../../../hooks/useForm";
import { Routes, Route } from "react-router-dom";
import { useState, useContext } from "react";
import { EmailForm } from "./assets/EmailForm"; // Import refactored EmailForm component
import styles from "./register.module.css";

export const Register = () => {
    const { onRegisterSubmitHandler } = useContext(AuthContext);
    const [currentStep, setCurrentStep] = useState(0);
    const [check, setCheck] = useState(false);
    const {
        values,
        error,
        onFocusHandler,
        validateHandler,
        changeHandler,
        onSubmitRegister,
        resetFormHandler,
    } = useForm(
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
            address: "",
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
                            error={error}
                            currentStepsHandler={currentStepsHandler}
                            changeHandler={changeHandler}
                            validateHandler={validateHandler}
                            onFocusHandler={onFocusHandler}
                        />
                    }
                />
                <Route
                    path="/userinfo"
                    element={
                        <InfoForm
                            {...values}
                            error={error}
                            currentStepsHandler={currentStepsHandler}
                            changeHandler={changeHandler}
                            validateHandler={validateHandler}
                            onFocusHandler={onFocusHandler}
                        />
                    }
                />
                <Route
                    path="/terms"
                    element={
                        <TermsForm
                            {...values}
                            error={error}
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
                            error={error}
                            changeHandler={changeHandler}
                            onSubmitRegister={onSubmitRegister}
                            currentStepsHandler={currentStepsHandler}
                            resetFormHandler={resetFormHandler}
                        />
                    }
                />
            </Routes>
        </div>
    );
};
