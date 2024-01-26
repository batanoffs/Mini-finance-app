import { useState } from "react";

export const useValidate = (initialState) => {
    const [error, setError] = useState(initialState);

    const errorHandler = (e) => {
        setError((state) => {
            const newState = { ...state };
            if (!e.target.value) {
                newState[e.target.name] = "полето е задължително";
            }
            return newState;
        });
    };

    const clearErrorHandler = (e) => {
        setError((state) => ({ ...state, [e.target.name]: "" }));
    };

    // const resetFormHandler = (e) => {
    //     if (e) {
    //         setValues((state) => ({
    //             ...state,
    //             [e.target.name]: e.target.value,
    //         }));
    //     }
    //     setValues({
    //         email: "",
    //         password: "",
    //         confirmPassword: "",
    //     });
    // };

    return {
        error,
        errorHandler,
        clearErrorHandler,
    };
};
