import { useState } from "react";

export const useForm = (initialState, onLogin, onRegister) => {
    const [values, setValues] = useState(initialState);

    const changeHandler = (e) => {

        ;
        // setValues((state) => ({ ...state, [e.target.name]: e.target.value }));

        // setValues((state) => ({...state,...{
        //         [e.target.name]: e.target.value,
        //         creditCard: {
        //             ...state.creditCard,
        //             [e.target.name]: e.target.value,
        //         },
        //     },
        // }));

        setValues((state) => {
            const newState = { ...state };

            if (e.target.name && e.target.value) {
                if (newState.creditCard) {
                    newState.creditCard[e.target.name] = e.target.value;
                }
                if (
                    e.target.name !== "cardNumber" &&
                    e.target.name !== "cvv" &&
                    e.target.name !== "expiryDate" &&
                    e.target.name !== "cardHolder" &&
                    e.target.name !== "picture"
                ) {
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
