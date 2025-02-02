import React from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

import { useValidate } from '../../hooks/useValidate';
import { FormInput } from '../inputs';

import styles from './payment-form.module.css';

export const PaymentForm = ({ inputState, setInputState }) => {
    const { error, errorHandler, clearErrorHandler } = useValidate({});

    const handleChange = (e) => {
        setInputState({ ...inputState, [e.target.name]: e.target.value });
    };

    const checkInputHandler = (e) => {
        const inputName = e.target.name;
        const currentValue = inputState[inputName];
        if (!currentValue) {
            return;
        } else {
            if (errorHandler(e)) {
                e.target.style.borderColor = 'red';
            } else {
                e.target.style.borderColor = 'lightgreen';
            }
        }
    };

    if (inputState.paymethod === 'debitcard') {
        return (
            <div className={styles.modalOptions}>
                <FormInput
                    type="text"
                    name="fullName"
                    placeholder="Enter card holder name"
                    value={inputState.fullName}
                    onChange={handleChange}
                    onBlur={checkInputHandler}
                    onFocus={clearErrorHandler}
                    className={styles.input}
                    error={error.fullName}
                    maxLength="30"
                    required
                />

                <div>
                    <FormInput
                        required
                        type="text"
                        name="cardnumber"
                        placeholder="Enter card number"
                        value={inputState.cardnumber}
                        onChange={handleChange}
                        onBlur={checkInputHandler}
                        onFocus={clearErrorHandler}
                        maxLength="16"
                        className={styles.input}
                        error={error.debitcard}
                    />

                    <FormInput
                        required
                        type="text"
                        name="expiry"
                        placeholder="Enter expiry date"
                        value={inputState.expiry}
                        onChange={handleChange}
                        onBlur={checkInputHandler}
                        onFocus={clearErrorHandler}
                        className={styles.input}
                        error={error.expiry}
                        maxLength="5"
                    />

                    <FormInput
                        placeholder="Enter cvv"
                        type="password"
                        name="cvv"
                        className={styles.input}
                        value={inputState.cvv}
                        onChange={handleChange}
                        onBlur={checkInputHandler}
                        onFocus={clearErrorHandler}
                        error={error.cvv}
                        maxLength="3"
                        required
                    />
                </div>
                <Cards
                    number={Number(inputState.cardnumber) || ''}
                    expiry={inputState.expiry || ''}
                    cvc={inputState.cvv || ''}
                    name={inputState.fullName || ''}
                />
            </div>
        );
    } else if (inputState.paymethod === 'paypal') {
        return (
            <div className={styles.modalOptions}>
                <FormInput
                    type="email"
                    name="email"
                    className={styles.input}
                    value={inputState.email}
                    onChange={handleChange}
                    onBlur={checkInputHandler}
                    onFocus={clearErrorHandler}
                    required
                    error={error.email}
                />

                <label htmlFor="email">Имейл:</label>
                <input />
            </div>
        );
    }
};
