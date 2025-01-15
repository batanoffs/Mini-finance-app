import { useState } from 'react';
import { formErrorMessage, formRegex } from '../constants/forms';

export const useValidate = (initialState) => {
    const [error, setErrors] = useState(initialState);

    const errorHandler = (event) => {
        const { name, value } = event.target;
        const newErrors = { ...error };

        // newErrors[event.target.name] = formErrorMessage[event.target.name] || newErrors[event.target.name];

        newErrors[name] = validateField(name, value, event);

        const hasError = newErrors[name] !== '';
        setErrors(newErrors);

        return hasError;
    };

    // Function to clear validation errors for a specific field
    const clearErrorHandler = (event) => {
        setErrors((error) => ({ ...error, [event.target.name]: '' }));
    };

    return {
        error,
        errorHandler,
        clearErrorHandler,
    };
};

const validateField = (fieldName, fieldValue, e) => {
    if (fieldName === 'confirmPassword') {
        const password =
            e.target.parentElement.parentElement.previousElementSibling.querySelector(
                "input[name='password']"
            ).value;
        return fieldValue === password ? '' : formErrorMessage[fieldName];
    }

    return formRegex[fieldName]?.test(fieldValue) ? '' : formErrorMessage[fieldName];
};
