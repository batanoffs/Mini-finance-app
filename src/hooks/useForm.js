import { useState } from 'react';
import { useValidate } from './useValidate';

export const useForm = (initialState, errorMessages, testRegex) => {
    const [values, setValues] = useState(initialState);
    const { error, errorHandler, clearErrorHandler } = useValidate(
        initialState,
        errorMessages,
        testRegex
    );

    const handleSubmit = (onSubmit) => (e) => {
        // prevent default form submission
        e.preventDefault();

        // call the service
        onSubmit(values);

        // reset the form
        resetFormHandler();
    };

    const changeHandler = (event) => {
        const { name, value, type, checked, files } = event.target;

        // Value conversion utility
        const convertValue = (type, value) => {
            switch (type) {
                case 'checkbox':
                    return checked;
                case 'tel':
                    return value;
                case 'number':
                    return value === '' ? '' : Number(value);
                case 'date':
                    return value ? new Date(value) : null;
                case 'file':
                    return files;
                default:
                    return value;
            }
        };

        // Handle nested or flat object structure
        const updateValues = (name, convertedValue) => {
            if (name.includes('.')) {
                setValues((prev) => {
                    const newState = { ...prev };
                    let current = newState;
                    const keys = name.split('.');

                    for (let i = 0; i < keys.length - 1; i++) {
                        current = current[keys[i]];
                    }
                    current[keys[keys.length - 1]] = convertedValue;
                    return newState;
                });
            } else {
                setValues((prev) => ({
                    ...prev,
                    [name]: convertedValue,
                }));
            }
        };

        updateValues(name, convertValue(type, value));
    };
    
    const validateHandler = (event) => {
        if (!event) return;

        errorHandler(event);
        event.target.style.borderColor = errorHandler(event) ? 'red' : 'lightgreen';
    };

    const onFocusHandler = (event) => {
        event.target.style.borderColor = 'var(--primary-hover-color)';
    };

    const resetFormHandler = (event) => {
        if (event) {
            clearErrorHandler(event); // Clear errors when resetting
            setValues(initialState);
        }
    };

    return {
        values,
        error,
        changeHandler,
        validateHandler,
        resetFormHandler,
        onFocusHandler,
        handleSubmit,
    };
};
