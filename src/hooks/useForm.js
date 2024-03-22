// import { useState } from "react";
// // import { useValidate } from "./useValidate";

// export const useForm = (initialState, onLogin, onRegister) => {
//     const [values, setValues] = useState(initialState);
//     // const { error, errorHandler, clearErrorHandler } = useValidate({});
//     const changeHandler = (e, photoInfo) => {
//         // setValues((state) => ({ ...state, [e.target.name]: e.target.value }));

//         setValues((state) => {
//             const newState = { ...state };

//             if (e === undefined && photoInfo) {
//                 newState["identity"] = photoInfo;
//             }

//             if (newState.virtualcard) {
//                 // newState.virtualcard[e.target.name] = e.target.value;
//                 if (
//                     e.target.name !== "balance" &&
//                     e.target.name !== "issuer" &&
//                     e.target.name !== "number" &&
//                     e.target.name !== "brand" &&
//                     e.target.name !== "expiration" &&
//                     e.target.name !== "cvv"
//                 ) {
//                     newState[e.target.name] = e.target.value;
                    
//                 }
//             } else {
//                 newState[e.target.name] = e.target.value;
//             }

//             return newState;
//         });
//     };

//     const resetFormHandler = (e) => {
//         if (e) {
//             setValues((state) => ({
//                 ...state,
//                 [e.target.name]: e.target.value,
//             }));
//         }
//         setValues({
//             email: "",
//             password: "",
//             confirmPassword: "",
//         });
//     };

//     const onSubmitLogin = (e) => {
//         e.preventDefault();
//         onLogin(values);
//         resetFormHandler();
//     };

//     const onSubmitRegister = (e) => {
//         e.preventDefault();
//         onRegister(values);
//         resetFormHandler();
//     };

//     return {
//         values,
//         changeHandler,
//         onSubmitLogin,
//         resetFormHandler,
//         onSubmitRegister,
//     };
// };
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
            if(errorHandler(e)) e.target.style.borderColor = "red";
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
        const loginSuccessful = !Object.values(error).some((value) => value) && await onLogin(values);
        console.log("Login response loginSuccessful: ", await loginSuccessful);
        resetFormHandler();
        return await loginSuccessful;
    };

    const onSubmitRegister = (e) => {
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
