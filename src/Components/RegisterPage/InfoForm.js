import { Link } from "react-router-dom";
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
    return (
        <section className="form-container">
            <div className="form-content">
                <article>
                    <header>
                        <h5>Моля, въведете вашите лични данни във формата</h5>
                    </header>
                    <label htmlFor="firstName">
                        Име <small className="star">*</small>
                    </label>
                    <input
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
                        className="form-control"
                        name="phoneNumber"
                        placeholder="Телефон"
                        value={phoneNumber}
                        onChange={changeHandler}
                    />

                    <label htmlFor="adress">
                        Адрес <small className="star">*</small>
                    </label>
                    <input
                        type="text"
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
                        placeholder="Държава"
                        value={country}
                        onChange={changeHandler}
                    />
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
                            to={"/mini-finance/register/identity"}
                            type="submit"
                            name="next"
                            className="button-primary"
                            onClick={currentStepsHandler}
                        >
                            Напред
                        </Link>
                    </footer>
                </article>
            </div>
        </section>
    );
};
