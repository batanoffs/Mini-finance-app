import { Link } from "react-router-dom";
import { useState } from "react";
import { Radio } from "antd";
import { useValidate } from "../../hooks/useValidate";

export const InfoForm = ({
    firstName,
    lastName,
    gender,
    phoneNumber,
    adress,
    town,
    country,
    changeHandler,
    currentStepsHandler,
}) => {
    const [errorOnNext, setError] = useState({
        status: true,
        message: "",
    });

    const { error, errorHandler, clearErrorHandler } = useValidate({
        firstName: "",
        lastName: "",
        gender: "",
        phoneNumber: "",
        adress: "",
        town: "",
        country: "",
    });

    const onFocusClearErrorHandler = (e) => {
        setError({ message: "" });
        clearErrorHandler(e);
    };

    const onNextPageHandler = (e) => {
        if (
            !!firstName &&
            !!lastName &&
            !!gender &&
            !!phoneNumber &&
            !!town &&
            !!country
        ) {
            currentStepsHandler(e);
            setError({
                status: false,
                message: "",
            });
        } else {
            setError({
                status: true,
                message: "Въведете задължителните полета",
            });
        }
    };
    return (
        <section className="form-container">
            <div className="form-content">
                <header>
                    <h5>Моля, въведете вашите лични данни във формата</h5>
                </header>
                <label htmlFor="firstName">
                    Име <small className="star">* {error.firstName}</small>
                </label>
                <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    placeholder="Име"
                    value={firstName}
                    onChange={changeHandler}
                    onBlur={errorHandler}
                    onFocus={onFocusClearErrorHandler}
                />

                <label htmlFor="lastName">
                    Фамилия <small className="star">* {error.lastName}</small>
                </label>
                <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    placeholder="Фамилия"
                    value={lastName}
                    onChange={changeHandler}
                    onBlur={errorHandler}
                    onFocus={onFocusClearErrorHandler}
                />

                <label>
                    Пол <small className="star">* {error.gender}</small>
                </label>
                <Radio.Group
                    name="gender"
                    value={gender}
                    onChange={changeHandler}
                    onBlur={errorHandler}
                    onFocus={onFocusClearErrorHandler}
                    style={{ marginBottom: "0.5rem" }}
                >
                    <Radio value="male"> Мъж </Radio>
                    <Radio value="female"> Жена </Radio>
                </Radio.Group>

                <label htmlFor="phoneNumber">
                    Телефон <small className="star">*{error.phoneNumber}</small>
                </label>
                <input
                    type="tel"
                    className="form-control"
                    name="phoneNumber"
                    placeholder="Телефон"
                    value={phoneNumber}
                    onChange={changeHandler}
                    onBlur={errorHandler}
                    onFocus={onFocusClearErrorHandler}
                />

                <label htmlFor="town">
                    Град <small className="star">*{error.town}</small>
                </label>
                <input
                    type="text"
                    className="form-control"
                    name="town"
                    placeholder="Град"
                    value={town}
                    onChange={changeHandler}
                    onBlur={errorHandler}
                    onFocus={onFocusClearErrorHandler}
                />

                <label htmlFor="country">
                    Държава <small className="star">* {error.country}</small>
                </label>
                <input
                    type="text"
                    className="form-control"
                    name="country"
                    id="country"
                    placeholder="Държава"
                    value={country}
                    onChange={changeHandler}
                    onBlur={errorHandler}
                    onFocus={onFocusClearErrorHandler}
                />
                <label htmlFor="adress">Адрес</label>
                <input
                    type="text"
                    className="form-control"
                    name="adress"
                    placeholder="Адрес"
                    value={adress}
                    onChange={changeHandler}
                    onBlur={errorHandler}
                    onFocus={onFocusClearErrorHandler}
                />
                <p className="text-danger">{errorOnNext.message}</p>
                <footer>
                    <Link
                        to={"/mini-finance/register"}
                        type="submit"
                        name="prev"
                        className="button-secondary"
                        onClick={currentStepsHandler}
                    >
                        Назад
                    </Link>
                    <Link
                        to={
                            errorOnNext.status
                                ? null
                                : "/mini-finance/register/identity"
                        }
                        type="submit"
                        name="next"
                        className="button-primary"
                        onClick={onNextPageHandler}
                    >
                        Напред
                    </Link>
                </footer>
            </div>
        </section>
    );
};
