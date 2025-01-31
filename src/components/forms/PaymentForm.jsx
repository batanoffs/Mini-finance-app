import React from 'react'
import Cards from 'react-credit-cards-2'

import { useValidate } from '../../hooks/useValidate'

import styles from './payment-form.module.css'
import 'react-credit-cards-2/dist/es/styles-compiled.css'

export const PaymentForm = ({ inputState, setInputState }) => {
    const { error, errorHandler, clearErrorHandler } = useValidate({})

    const handleChange = (e) => {
        setInputState({ ...inputState, [e.target.name]: e.target.value })
    }

    const checkInputHandler = (e) => {
        const inputName = e.target.name
        const currentValue = inputState[inputName]
        if (!currentValue) {
            return
        } else {
            if (errorHandler(e)) {
                e.target.style.borderColor = 'red'
            } else {
                e.target.style.borderColor = 'lightgreen'
            }
        }
    }

    if (inputState.paymethod === 'debitcard') {
        return (
            <div className={styles.modalOptions}>
                <div className="form-group">
                    <label htmlFor="debitcard">Притежател:</label>
                    <input
                        required
                        type="text"
                        name="fullName"
                        value={inputState.fullName}
                        onChange={handleChange}
                        onBlur={checkInputHandler}
                        onFocus={clearErrorHandler}
                        className={styles.input}
                        maxLength="30"
                    />
                </div>
                <small className={styles.error}>{error.fullName}</small>
                <div>
                    <div className="form-group">
                        <label htmlFor="cardnumber">Номер:</label>
                        <input
                            required
                            type="text"
                            name="cardnumber"
                            value={inputState.cardnumber}
                            onChange={handleChange}
                            onBlur={checkInputHandler}
                            onFocus={clearErrorHandler}
                            maxLength="16"
                            className={styles.input}
                        />
                    </div>

                    <small className={styles.error}>{error.debitcard}</small>

                    <div className="form-group">
                        <label htmlFor="expiry">Валидност:</label>
                        <input
                            required
                            type="text"
                            name="expiry"
                            value={inputState.expiry}
                            onChange={handleChange}
                            onBlur={checkInputHandler}
                            onFocus={clearErrorHandler}
                            className={styles.input}
                            maxLength="5"
                        />
                    </div>
                    <small className={styles.error}>{error.expiry}</small>

                    <div className="form-group">
                        <label htmlFor="cvv">CVV:</label>
                        <input
                            type="password"
                            name="cvv"
                            className={styles.input}
                            value={inputState.cvv}
                            onChange={handleChange}
                            onBlur={checkInputHandler}
                            onFocus={clearErrorHandler}
                            maxLength="3"
                            required
                        />
                    </div>
                    <small className={styles.error}>{error.cvv}</small>
                </div>
                <Cards
                    number={Number(inputState.cardnumber) || ''}
                    expiry={inputState.expiry || ''}
                    cvc={inputState.cvv || ''}
                    name={inputState.fullName || ''}
                />
            </div>
        )
    } else if (inputState.paymethod === 'paypal') {
        return (
            <>
                <div className={styles.modalOptions}>
                    <label htmlFor="email">Имейл:</label>
                    <input
                        type="email"
                        name="email"
                        className={styles.input}
                        value={inputState.email}
                        onChange={handleChange}
                        onBlur={checkInputHandler}
                        onFocus={clearErrorHandler}
                        required
                    />
                </div>
                <small className={styles.error}>{error.email}</small>
            </>
        )
    }
}
