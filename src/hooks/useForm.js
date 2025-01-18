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
        const { name, value, type, checked } = event.target;
        
        // Handle nested object paths (e.g., "user.name")
        if (name.includes('.')) {
            const keys = name.split('.');
            setValues(prev => {
                const newState = { ...prev };
                let current = newState;
                
                // Traverse to the nested property
                for (let i = 0; i < keys.length - 1; i++) {
                    current = current[keys[i]];
                }
                
                // Set the value based on input type
                current[keys[keys.length - 1]] = type === 'checkbox' 
                    ? checked 
                    : type === 'number'
                        ? Number(value)
                        : value;
                        
                return newState;
            });
        } else {
            // Handle regular inputs
            setValues(prev => ({
                ...prev,
                [name]: type === 'checkbox' 
                    ? checked 
                    : type === 'number'
                        ? Number(value)
                        : value
            }));
        }
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
