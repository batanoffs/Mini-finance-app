import { useState } from "react";

export const useForm = (initialState, onLogin, onRegister) => {
    const [values, setValues] = useState(initialState);

    const changeHandler = (e, photoInfo) => {
        // setValues((state) => ({ ...state, [e.target.name]: e.target.value }));

        setValues((state) => {
            const newState = { ...state };

            if (e === undefined && photoInfo) {
                newState["identity"] = photoInfo;
            } else if (e.target.name && e.target.value) {
                if (newState.creditCard) {
                    // newState.creditCard[e.target.name] = e.target.value;
                    if (
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
            }

            return newState;
        });
    };

    const resetFormHandler = (e) => {
        if (e) {
            setValues((state) => ({
                ...state,
                [e.target.name]: e.target.value,
            }));
        }
        setValues({
            email: "",
            password: "",
            confirmPassword: "",
        });
    };

    const onSubmitLogin = (e) => {
        e.preventDefault();
        onLogin(values);
        resetFormHandler();
    };

    const onSubmitRegister = (e) => {
        e.preventDefault();
        onRegister(values);
        resetFormHandler();
    };

    return {
        values,
        changeHandler,
        onSubmitLogin,
        resetFormHandler,
        onSubmitRegister,
    };
};
