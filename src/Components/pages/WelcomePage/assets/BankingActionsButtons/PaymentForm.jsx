import { useValidate } from '../../../../../hooks/useValidate'
import React from 'react'
import Cards from 'react-credit-cards-2'

import modal from './modal.module.css'
import errorstyle from '../../../RegisterPage/register.module.css'
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
            <div className={modal.modalOptions}>
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
                        className={modal.input}
                        maxLength="30"
                    />
                </div>
                <small className={errorstyle.error}>{error.fullName}</small>
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
                            className={modal.input}
                        />
                    </div>

                    <small className={errorstyle.error}>{error.debitcard}</small>

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
                            className={modal.input}
                            maxLength="5"
                        />
                    </div>
                    <small className={errorstyle.error}>{error.expiry}</small>

                    <div className="form-group">
                        <label htmlFor="cvv">CVV:</label>
                        <input
                            required
                            type="password"
                            name="cvv"
                            className={modal.input}
                            value={inputState.cvv}
                            onChange={handleChange}
                            onBlur={checkInputHandler}
                            onFocus={clearErrorHandler}
                            maxLength="3"
                        />
                    </div>
                    <small className={errorstyle.error}>{error.cvv}</small>
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
                <div className={modal.modalOptions}>
                    <label htmlFor="email">Имейл:</label>
                    <input
                        required
                        type="email"
                        name="email"
                        className={modal.input}
                        value={inputState.email}
                        onChange={handleChange}
                        onBlur={checkInputHandler}
                        onFocus={clearErrorHandler}
                    />
                </div>
                <small className={errorstyle.error}>{error.email}</small>
            </>
        )
    }
}
