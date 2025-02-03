import { useState } from 'react';
import { useForm, useMessage } from '../../hooks';
import { formState, errorMessages, formRegex } from './constants';

export const useResetPass = () => {
    const [isLoading, setIsLoading] = useState(false);
    const {
        values,
        error,
        changeHandler,
        validateHandler,
        resetFormHandler,
        onFocusHandler,
        handleSubmit,
    } = useForm(formState, errorMessages, formRegex);
    const showMessage = useMessage();

    const onSubmit = async () => {
        try {
            setIsLoading(true);
            await authService.resetPassword(values.email);
            showMessage('success', 'Password reset email sent successfully.');
            resetFormHandler();
        } catch (error) {
            console.error('Reset password error:', error);
            showMessage('error', error.message || 'Reset password failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        values,
        error,
        onSubmit,
        changeHandler,
        validateHandler,
        onFocusHandler,
        handleSubmit,
    };
};
