import { useState, useContext } from 'react';

import { InfoForm, TermsForm, EmailForm, SidebarRegister, ConfirmForm } from './assets/index';
import { AuthContext } from '../../contexts/AuthContext';
import { useForm } from '../../hooks/useForm';
import { formInitialState } from './constants';

import styles from './register.module.css';

export const Register = () => {
    const { onRegisterSubmitHandler } = useContext(AuthContext);
    const [currentStep, setCurrentStep] = useState(0);
    const {
        values,
        error,
        onFocusHandler,
        validateHandler,
        changeHandler,
        onSubmitRegister,
        resetFormHandler,
    } = useForm(formInitialState, null, onRegisterSubmitHandler);

    const currentStepsHandler = (e) => {
        const stepChange = e.target.name === 'next' ? 1 : -1;
        setCurrentStep((prev) => prev + stepChange);
    };

    return (
        <div className={styles.register_content_container}>
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
                />
            )}
            {currentStep === 3 && (
                <ConfirmForm
                    {...values}
                    error={error}
                    currentStepsHandler={currentStepsHandler}
                    changeHandler={changeHandler}
                    onSubmitRegister={onSubmitRegister}
                    resetFormHandler={resetFormHandler}
                />
            )}
        </div>
    );
};
