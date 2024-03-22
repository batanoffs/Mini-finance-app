import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Radio } from 'antd';

export const InfoForm = ({
    firstName,
    lastName,
    gender,
    phoneNumber,
    town,
    country,
    adress,
    validateHandler,
    error,
    changeHandler,
    currentStepsHandler,
}) => {
    const onFocusClearErrorHandler = () => {
        // Clear error when input is focused
    };

    const onNextPageHandler = (e) => {
        e.preventDefault();
        const requiredFields = [firstName, lastName, gender, phoneNumber, town, country];
        const hasEmptyField = requiredFields.some(field => !field);

        if (!hasEmptyField) {
            currentStepsHandler(e); // Move to the next step
        } else {
            // Show error message for empty fields
        }
    };
    const isNextDisabled = [firstName, lastName, gender, phoneNumber, town, country].some(field => !field);

    return (
        <section className="form-container">
            <div className="form-content">
                <header>
                    <h5>Моля, въведете вашите лични данни във формата</h5>
                </header>
                <div className="form-group">
                    <label htmlFor="firstName">
                        Име <small className="error">* {error.firstName}</small>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        placeholder="Име"
                        value={firstName}
                        onChange={changeHandler}
                        onFocus={onFocusClearErrorHandler}
                        onBlur={validateHandler}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">
                        Фамилия{' '}
                        <small className="error">* {error.lastName}</small>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        placeholder="Фамилия"
                        value={lastName}
                        onChange={changeHandler}
                        onFocus={onFocusClearErrorHandler}
                    />
                </div>
                <div className="form-group">
                    <label>
                        Пол <small className="error">* {error.gender}</small>
                    </label>
                    <Radio.Group
                        name="gender"
                        value={gender}
                        onChange={changeHandler}
                        onFocus={onFocusClearErrorHandler}
                        style={{ marginBottom: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}
                    >
                        <Radio style={{ fontSize: '1rem' }} value="male"> Мъж </Radio>
                        <Radio style={{ fontSize: '1rem' }} value="female"> Жена </Radio>
                    </Radio.Group>
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">
                        Телефон{' '}
                        <small className="error">*{error.phoneNumber}</small>
                    </label>
                    <input
                        type="tel"
                        className="form-control"
                        name="phoneNumber"
                        placeholder="Телефон"
                        value={phoneNumber}
                        onChange={changeHandler}
                        onFocus={onFocusClearErrorHandler}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="town">
                        Град <small className="error">*{error.town}</small>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="town"
                        placeholder="Град"
                        value={town}
                        onChange={changeHandler}
                        onFocus={onFocusClearErrorHandler}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="country">
                        Държава{' '}
                        <small className="error">* {error.country}</small>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="country"
                        id="country"
                        placeholder="Държава"
                        value={country}
                        onChange={changeHandler}
                        onFocus={onFocusClearErrorHandler}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="adress">Адрес</label>
                    <input
                        type="text"
                        className="form-control"
                        name="adress"
                        placeholder="Адрес"
                        value={adress}
                        onChange={changeHandler}
                        onFocus={onFocusClearErrorHandler}
                    />
                </div>
                {/* <p className="error">{errorOnNext}</p> */}
                <footer>
                    <Link
                        to={"/register"}
                        type="submit"
                        name="prev"
                        className="button-secondary"
                        onClick={currentStepsHandler}
                    >
                        Назад
                    </Link>
                    <Link
                        type="submit"
                        name="next"
                        className="button-primary"
                        onClick={onNextPageHandler}
                        disabled={isNextDisabled}
                    >
                        Напред
                    </Link>
                </footer>
            </div>
        </section>
    );
};
