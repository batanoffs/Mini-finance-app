import { useState } from 'react';
import { useValidate } from './useValidate';
import { useMessage } from './useMessage';

export const useForm = (initialState, onLogin, onRegister) => {
    const [values, setValues] = useState(initialState);
    const { error, errorHandler, clearErrorHandler } = useValidate({});
    const message = useMessage();

    const changeHandler = (event, photoInfo) => {
        setValues((state) => {
            const newState = { ...state };

            if (event === undefined && photoInfo) {
                newState['identity'] = photoInfo;
            }

            if (newState.virtualcard) {
                if (
                    event &&
                    event.target.name !== 'balance' &&
                    event.target.name !== 'issuer' &&
                    event.target.name !== 'number' &&
                    event.target.name !== 'brand' &&
                    event.target.name !== 'expiration' &&
                    event.target.name !== 'cvv'
                ) {
                    newState[event.target.name] = event.target.value;
                }
            } else if (newState.termsAccept) {
                newState[event.target.name] = event.target.checked;
            } else {
                newState[event.target.name] = event.target.value;
            }

            return newState;
        });
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

    const onSubmitLogin = async (e) => {
        e.preventDefault();
        const loginResponse = await onLogin(values);
        const isLoginSuccessful = !Object.values(error).some((value) => value) && loginResponse;

        resetFormHandler();
        return await isLoginSuccessful;
    };

    const onSubmitRegister = async (e) => {
        e.preventDefault();
        const checkError = Object.values(error).some((value) => value);
        const listErrors = Object.values(error).find((value) => value);
        if (!checkError) {
            onRegister(values);
            resetFormHandler();
        } else {
            console.error('Errors found during registration', listErrors);
            message('error', `Validation failed, errors found: ${listErrors}`);
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
