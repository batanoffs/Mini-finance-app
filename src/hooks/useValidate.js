import { useState } from "react";

export const useValidate = (initialState) => {
    const [error, setErrors] = useState(initialState);

    const errorHandler = (e) => {
        const newErrors = { ...error };
        const validateEmail =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gm;
        const validateUsername = /^[a-zA-Z0-9-]{3,16}$/gm;
        const validatePassword =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/gm;
        const validatePhone = /0[8-9][6-9]{2}\d{6}/gm;
        const validateName = /^[a-zA-Zа-яА-Я]{2,30}$/gm;
        const validateAdress = /^[a-zA-Zа-яА-Я]{2,30}$/gm;

        const errorMessage = {
            email: "Invalid email",
            firstName: "Min 2 chars",
            lastName: "Min 2 chars",
            address: "Min 5 chars",
            country: "Min 2 chars",
            town: "Min 2 chars",
            phoneNumber: "Invalid phone number",
            username: "3-16 chars, -, a-z, A-Z",
            password: "Upper, lower, digit, min 8 chars",
            confirmPassword: "Passwords don't match",
        };

        newErrors[e.target.name] =
            errorMessage[e.target.name] || newErrors[e.target.name];

        switch (e.target.name) {
            case "email":
                newErrors[e.target.name] = validateEmail.test(e.target.value)
                    ? ""
                    : newErrors[e.target.name];
                break;
            case "firstName":
                newErrors[e.target.name] = validateName.test(e.target.value)
                    ? ""
                    : newErrors[e.target.name];
                break;
            case "lastName":
                newErrors[e.target.name] = validateName.test(e.target.value)
                    ? ""
                    : newErrors[e.target.name];
                break;
            case "address":
                newErrors[e.target.name] = validateAdress.test(e.target.value)
                    ? ""
                    : newErrors[e.target.name];
                break;
            case "country":
                newErrors[e.target.name] =
                    e.target.value.length >= 2 ? "" : newErrors[e.target.name];
                break;
            case "town":
                newErrors[e.target.name] =
                    e.target.value.length >= 5 ? "" : newErrors[e.target.name];
                break;
            case "phoneNumber":
                newErrors[e.target.name] = validatePhone.test(e.target.value)
                    ? ""
                    : newErrors[e.target.name];
                break;
            case "username":
                newErrors[e.target.name] = validateUsername.test(e.target.value)
                    ? ""
                    : newErrors[e.target.name];
                break;
            case "password":
                newErrors[e.target.name] = validatePassword.test(e.target.value)
                    ? ""
                    : newErrors[e.target.name];
                break;
            case "confirmPassword":
                const target =
                    e.target.parentElement.previousElementSibling.previousElementSibling.querySelector(
                        "input[name='password']"
                    );
                console.log(target);
                newErrors[e.target.name] =
                    e.target.value === target.value
                        ? ""
                        : newErrors[e.target.name];
                break;
            default:
                break;
        }

        const hasError = newErrors[e.target.name] !== "";
        setErrors(newErrors);

        return hasError;
    };

    const clearErrorHandler = (e) => {
        setErrors((error) => ({ ...error, [e.target.name]: "" }));
    };

    return {
        error,
        errorHandler,
        clearErrorHandler,
    };
};
