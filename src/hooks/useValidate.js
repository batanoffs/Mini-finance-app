import { useState } from "react";

export const useValidate = (initialState) => {
    const [error, setErrors] = useState(initialState);

    const errorHandler = (e) => {
        const newErrors = { ...error };
        const validateEmail = /\w+@\w+\.\w+/gm;
        const validateUsername = /^[a-zA-Z0-9-]{3,16}$/gm;
        const validatePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/gm;
        const validatePhone = /08[7-9][0-9]{7}/gm;
        const validateName = /^[a-zA-Zа-яА-Я]{2,30}$/gm;
        const validateCityCountry = /^[a-zA-Zа-яА-Я]{3,30}$/gm;

        const errorMessage = {
            email: "Невалиден e-mail",
            firstName: "Минимално 2 символа",
            lastName: "Минимално 2 символа",
            country: "Минимално 3 символа",
            town: "Минимално 3 символа",
            phoneNumber: "Невалиден BG телефон",
            username: "3-16 символа, -, a-z, A-Z",
            password: "Големи и малки букви, цифри, минимално 8 символа",
            confirmPassword: "Паролите не съвпадат",

        };

        newErrors[e.target.name] = errorMessage[e.target.name] || newErrors[e.target.name];

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
            case "country":
                newErrors[e.target.name] = validateCityCountry.test(e.target.value)
                    ? ""
                    : newErrors[e.target.name];
                break;
            case "town":
                newErrors[e.target.name] = validateCityCountry.test(e.target.value)
                    ? ""
                    : newErrors[e.target.name];
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
