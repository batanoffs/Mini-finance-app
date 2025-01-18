import { useState } from 'react';

import { InfoForm, TermsForm, EmailForm, SidebarRegister, ConfirmForm } from './assets';
import { formState, errorMessages, formRegex } from './constants';
import { useForm } from '../../hooks/useForm';
import { useRegister } from './useRegister';

import styles from './register.module.css';

export const Register = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const { onRegister } = useRegister();
    const {
        values,
        error,
        onFocusHandler,
        validateHandler,
        changeHandler,
        handleSubmit,
        resetFormHandler,
    } = useForm(formState, errorMessages, formRegex);

    const onSubmit = (data) => {
        onRegister(data);
    };

    const currentStepsHandler = (e) => {
        const stepChange = e.target.name === 'next' ? 1 : -1;
        setCurrentStep((prev) => prev + stepChange);
    };

    return (
        <div className={styles.registerContainer}>
            <SidebarRegister currentStep={currentStep} />
            {currentStep === 0 && (
                <EmailForm
                    {...values}
                    error={error}
                    currentStepsHandler={currentStepsHandler}
                    changeHandler={changeHandler}
                    validateHandler={validateHandler}
                    onFocusHandler={onFocusHandler}
                />
            )}
            {currentStep === 1 && (
                <InfoForm
                    {...values}
                    error={error}
                    currentStepsHandler={currentStepsHandler}
                    changeHandler={changeHandler}
                    validateHandler={validateHandler}
                    onFocusHandler={onFocusHandler}
                />
            )}
            {currentStep === 2 && (
                <TermsForm
                    {...values}
                    error={error}
                    currentStepsHandler={currentStepsHandler}
                    changeHandler={changeHandler}
                    validateHandler={validateHandler}
                />
            )}
            {currentStep === 3 && (
                <ConfirmForm
                    {...values}
                    error={error}
                    currentStepsHandler={currentStepsHandler}
                    changeHandler={changeHandler}
                    handleSubmit={handleSubmit(onSubmit)}
                    resetFormHandler={resetFormHandler}
                />
            )}
        </div>
    );
};
