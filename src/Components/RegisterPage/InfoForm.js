import { Link } from "react-router-dom";
import { useState } from "react";
import { Radio } from "antd";

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
    const [error, setError] = useState({
        status: true,
        message: "",
    });
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
                        Име <small className="star">*</small>
                    </label>
                    <input
                        onFocus={() => setError({ status: false, message: "" })}
                        type="text"
                        className="form-control"
                        name="firstName"
                        placeholder="Име"
                        value={firstName}
                        onChange={changeHandler}
                    />

                    <label htmlFor="lastName">
                        Фамилия <small className="star">*</small>
                    </label>
                    <input
                        onFocus={() => setError({ status: false, message: "" })}
                        type="text"
                        className="form-control"
                        name="lastName"
                        placeholder="Фамилия"
                        value={lastName}
                        onChange={changeHandler}
                    />

                    <label>
                        Пол <small className="star">*</small>
                    </label>
                    <Radio.Group
                        name="gender"
                        onFocus={() => setError({ status: false, message: "" })}
                        value={gender}
                        onChange={changeHandler}
                        style={{ marginBottom: "0.5rem" }}
                    >
                        <Radio value="male"> Мъж </Radio>
                        <Radio value="female"> Жена </Radio>
                    </Radio.Group>

                    <label htmlFor="phoneNumber">
                        Телефон <small className="star">*</small>
                    </label>
                    <input
                        type="tel"
                        onFocus={() => setError({ status: false, message: "" })}
                        className="form-control"
                        name="phoneNumber"
                        placeholder="Телефон"
                        value={phoneNumber}
                        onChange={changeHandler}
                    />

                    <label htmlFor="adress">
                        Адрес
                    </label>
                    <input
                        type="text"
                        onFocus={() => setError({ status: false, message: "" })}
                        className="form-control"
                        name="adress"
                        placeholder="Адрес"
                        value={adress}
                        onChange={changeHandler}
                    />

                    <label htmlFor="town">
                        Град <small className="star">*</small>
                    </label>
                    <input
                        type="text"
                        onFocus={() => setError({ status: false, message: "" })}
                        className="form-control"
                        name="town"
                        placeholder="Град"
                        value={town}
                        onChange={changeHandler}
                    />

                    <label htmlFor="country">
                        Държава <small className="star">*</small>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="country"
                        id="country"
                        onFocus={() => setError({ status: false, message: "" })}
                        placeholder="Държава"
                        value={country}
                        onChange={changeHandler}
                    />
                    <p className="text-danger">{error.message}</p>
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
                                error.status
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
