import { useState } from "react";
import { useValidate } from "./useValidate";

export const useForm = (initialState, onLogin, onRegister) => {
    const [values, setValues] = useState(initialState);
    const { error, errorHandler, clearErrorHandler } = useValidate({});

    const changeHandler = (e, photoInfo) => {
        setValues((state) => {
            const newState = { ...state };

            if (e === undefined && photoInfo) {
                newState["identity"] = photoInfo;
            }

            if (newState.virtualcard) {
                if (
                    e &&
                    e.target.name !== "balance" &&
                    e.target.name !== "issuer" &&
                    e.target.name !== "number" &&
                    e.target.name !== "brand" &&
                    e.target.name !== "expiration" &&
                    e.target.name !== "cvv"
                ) {
                    newState[e.target.name] = e.target.value;
                }
            } else {
                newState[e.target.name] = e.target.value;
            }

            return newState;
        });
    };

    const validateHandler = (e) => {
        if (e) {
            errorHandler(e); // Validate the input
            if(errorHandler(e)) {
                e.target.style.borderColor = "red";
            } else {
                e.target.style.borderColor = "lightgreen";
            }
        }
    };
    const onFocusHandler = (e) => {
        e.target.style.borderColor = "var(--primary-hover-color)";
    };

    const resetFormHandler = (e) => {
        if (e) {
            clearErrorHandler(e); // Clear errors when resetting
        }
        setValues({
            email: "",
            password: "",
            confirmPassword: "",
        });
    };

    const onSubmitLogin = async (e) => {
        e.preventDefault();
        const loginResponse = await onLogin(values);
        const isLoginSuccessful = !Object.values(error).some((value) => value) && loginResponse;
        console.log("Result of login: ", loginResponse);
        resetFormHandler();
        return await isLoginSuccessful;
    };

    const onSubmitRegister = async(e) => {
        e.preventDefault();
        if (!Object.values(error).some((value) => value)) {
            onRegister(values);
            resetFormHandler();
        }
    };

    return {
        values,
        error,
        changeHandler,
        validateHandler,
        onSubmitLogin,
        resetFormHandler,
        onSubmitRegister,
        onFocusHandler,
    };
};
