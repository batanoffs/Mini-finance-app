import { useState } from 'react';

export const useValidate = (initialState, errorMessages, formRegex) => {
    const [error, setErrors] = useState(initialState);

    const errorHandler = (event) => {
        const { name, value } = event.target;
        const newErrors = { ...error };

        newErrors[name] = validateField(name, value, event, errorMessages, formRegex);

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

const validateField = (fieldName, fieldValue, e, errorMessages, testRegex) => {
    if (fieldName === 'confirmPassword') {
        const password =
            e.target.parentElement.parentElement.previousElementSibling.querySelector(
                "input[name='password']"
            ).value;
        return fieldValue === password ? '' : errorMessages[fieldName];
    }

    return testRegex[fieldName]?.test(fieldValue) ? '' : errorMessages[fieldName];
};
