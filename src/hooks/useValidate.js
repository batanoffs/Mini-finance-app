import { useState } from "react";

export const useValidate = (initialState) => {
    const [error, setErrors] = useState(initialState);

    const errorHandler = (e) => {
        const newErrors = { ...error };
        const validateEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const validateUsername = /^[a-zA-Z0-9-]{3,16}$/gm;
        const validatePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/gm;
        const validatePhone = /08[7-9][0-9]{7}/gm;
        const validateName = /^[a-zA-Zа-яА-Я]{2,30}$/gm;
        const validateCityCountry = /^[a-zA-Zа-яА-Я]{3,30}$/gm;
        const validateExpiry = /^((0[1-9])|(1[0-2]))\/([0-9]{2}|[1-9][0-9])$/;
        const validateCVV = /^\d{3,4}$/;
        const validateCardNumber = /^((?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12})|(4[0-9]{12}(?:[0-9]{3})?)$/gm;
        const validateFullname = /^[a-zA-Zа-яА-Я]{2,} [a-zA-Zа-яА-Я]{2,}$/gm;
        const errorMessage = {
            email: "само букви, цифри, символи ._%+ и @",
            firstName: "минимален брой символи 2",
            lastName: "минимален брой символи 2",
            country: "минимален брой символи 3",
            town: "минимален брой символи 3",
            phoneNumber: "невалиден номер",
            username: "3-16 символа, -, a-z, A-Z",
            password: "големи и малки букви, цифри, над 8 символа",
            confirmPassword: "паролите не съвпадат",
            iban: "само букви и цифри, 16 символа",
            expiry: "формат на дата MM/YY",
            cvv: "само 3 или 4 цифри",
            swift: "само букви и цифри, 4-5 символа",
            bank: "само букви и цифри, до 30 символа",
            description: "само букви и цифри, 2-30 символа",
            cardnumber: "номерът трябва да е 16 цифри",
            fullName: "само букви, име и фамилия",
        };

        newErrors[e.target.name] = errorMessage[e.target.name] || newErrors[e.target.name];

        switch (e.target.name) {
            case "fullName":
                newErrors[e.target.name] = validateFullname.test(e.target.value)
                    ? ""
                    : newErrors[e.target.name];
                break;
            case "cardnumber":
                newErrors[e.target.name] = validateCardNumber.test(e.target.value)
                    ? ""
                    : newErrors[e.target.name];
                break;
            case "expiry":
                newErrors[e.target.name] = validateExpiry.test(e.target.value)
                    ? ""
                    : newErrors[e.target.name];
                break;
            case "cvv":
                newErrors[e.target.name] = validateCVV.test(e.target.value)
                    ? ""
                    : newErrors[e.target.name];
                break;
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
