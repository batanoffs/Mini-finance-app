import React from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

import { useValidate } from '../../../../../../hooks/useValidate';
import { FormInput } from '../../../../../../components/inputs';

import styles from './payment-form.module.css';

export const PaymentForm = ({ inputState, setInputState, errors, setErrors }) => {
    const { error, errorHandler, clearErrorHandler } = useValidate({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputState(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const checkInputHandler = (e) => {
        const { name, value } = e.target;
        if (!value) {
            setErrors(prev => ({ 
                ...prev, 
                [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is required` 
            }));
            return;
        }
        
        if (errorHandler(e)) {
            setErrors(prev => ({ ...prev, [name]: error[name] }));
        } else {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    if (inputState.paymethod === 'debitcard') {
        return (
            <div className={styles.modalOptions}>
                <FormInput
                    type="text"
                    name="fullName"
                    id="cardHolderName"
                    placeholder="Enter card holder name"
                    value={inputState.fullName}
                    onChange={handleChange}
                    onBlur={checkInputHandler}
                    onFocus={clearErrorHandler}
                    className={`${styles.input} ${errors.fullName ? styles.inputError : ''}`}
                    error={errors.fullName || error.fullName}
                    maxLength={30}
                    required
                    aria-label="Card Holder Name"
                />

                <div className={styles.cardDetails}>
                    <FormInput
                        type="text"
                        name="cardnumber"
                        id="cardNumber"
                        placeholder="Enter card number"
                        value={inputState.cardnumber}
                        onChange={handleChange}
                        onBlur={checkInputHandler}
                        onFocus={clearErrorHandler}
                        maxLength={16}
                        className={`${styles.input} ${errors.cardnumber ? styles.inputError : ''}`}
                        error={errors.cardnumber || error.debitcard}
                        required
                        aria-label="Card Number"
                    />

                    <FormInput
                        type="text"
                        name="expiry"
                        id="cardExpiry"
                        placeholder="MM/YY"
                        value={inputState.expiry}
                        onChange={handleChange}
                        onBlur={checkInputHandler}
                        onFocus={clearErrorHandler}
                        className={`${styles.input} ${errors.expiry ? styles.inputError : ''}`}
                        error={errors.expiry || error.expiry}
                        maxLength={5}
                        required
                        aria-label="Card Expiry Date"
                    />

                    <FormInput
                        type="password"
                        name="cvv"
                        id="cardCvv"
                        placeholder="CVV"
                        value={inputState.cvv}
                        onChange={handleChange}
                        onBlur={checkInputHandler}
                        onFocus={clearErrorHandler}
                        className={`${styles.input} ${errors.cvv ? styles.inputError : ''}`}
                        error={errors.cvv || error.cvv}
                        maxLength={3}
                        required
                        aria-label="Card CVV"
                    />
                </div>
                
                <div className={styles.cardPreview}>
                    <Cards
                        number={inputState.cardnumber || ''}
                        expiry={inputState.expiry || ''}
                        cvc={inputState.cvv || ''}
                        name={inputState.fullName || ''}
                        focused={Object.keys(errors).length === 0}
                    />
                </div>
            </div>
        );
    } else if (inputState.paymethod === 'paypal') {
        return (
            <div className={styles.modalOptions}>
                <FormInput
                    type="email"
                    name="email"
                    id="paypalEmail"
                    placeholder="Enter your PayPal email"
                    className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                    value={inputState.email || ''}
                    onChange={handleChange}
                    onBlur={checkInputHandler}
                    onFocus={clearErrorHandler}
                    required
                    error={errors.email || error.email}
                    aria-label="PayPal Email"
                />
            </div>
        );
    }
    
    return null;
};
