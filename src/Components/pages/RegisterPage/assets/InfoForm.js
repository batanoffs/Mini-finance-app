import { Link, useNavigate } from "react-router-dom";
import { Radio } from "antd";

import { useMessage } from "../../../../hooks/useMessage";

import styles from "../register.module.css";

export const InfoForm = ({
    firstName,
    lastName,
    gender,
    phoneNumber,
    town,
    country,
    address,
    validateHandler,
    onFocusHandler,
    error,
    changeHandler,
    currentStepsHandler,
}) => {
    const navigate = useNavigate();
    const showMessage = useMessage();
    const onNextPageHandler = (e) => {
        e.preventDefault();
        const requiredFields = [
            firstName,
            lastName,
            gender,
            phoneNumber,
            town,
            country,
        ];
        const hasEmptyField = requiredFields.some((field) => !field);

        if (!hasEmptyField) {
            currentStepsHandler(e); // Move to the next step
            navigate("/register/terms");
        } else {
            // Show error message for empty fields
            showMessage("error", "Моля, попълнете всички полета");
        }
    };
    const isNextDisabled = [
        firstName,
        lastName,
        gender,
        phoneNumber,
        town,
        country,
    ].some((field) => !field);

    return (
        <section className="form-container">
            <div className="form-content">
                <header>
                    <h5>Моля, въведете вашите лични данни във формата</h5>
                </header>
                <div className="form-group">
                    <label htmlFor="firstName">
                        Име <small className="error">*</small>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        placeholder="Име"
                        value={firstName}
                        onChange={changeHandler}
                        onBlur={validateHandler}
                        onFocus={onFocusHandler}
                        required
                    />
                </div>
                <small className={styles.error}>{error.firstName}</small>

                <div className="form-group">
                    <label htmlFor="lastName">
                        Фамилия <small className="error">*</small>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        placeholder="Фамилия"
                        value={lastName}
                        onChange={changeHandler}
                        onBlur={validateHandler}
                        onFocus={onFocusHandler}
                    />
                </div>
                <small className={styles.error}>{error.lastName}</small>
                <div className="form-group">
                    <label>
                        Пол <small className="error">*</small>
                    </label>
                    <Radio.Group
                        name="gender"
                        value={gender}
                        onChange={changeHandler}
                        onBlur={validateHandler}
                        onFocus={onFocusHandler}
                        style={{
                            marginBottom: "1.2rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.4rem",
                        }}
                    >
                        <Radio style={{ fontSize: "1rem" }} value="male">
                            {" "}
                            Мъж{" "}
                        </Radio>
                        <Radio style={{ fontSize: "1rem" }} value="female">
                            {" "}
                            Жена{" "}
                        </Radio>
                    </Radio.Group>
                </div>
                <small className={styles.error}>{error.gender}</small>

                <div className="form-group">
                    <label htmlFor="phoneNumber">
                        Телефон <small className="error">*</small>
                    </label>
                    <input
                        type="tel"
                        className="form-control"
                        name="phoneNumber"
                        placeholder="Телефон"
                        value={phoneNumber}
                        onChange={changeHandler}
                        onBlur={validateHandler}
                        onFocus={onFocusHandler}
                    />
                </div>
                <small className={styles.error}>{error.phoneNumber}</small>

                <div className="form-group">
                    <label htmlFor="town">
                        Град <small className="error">*</small>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="town"
                        placeholder="Град"
                        value={town}
                        onChange={changeHandler}
                        onBlur={validateHandler}
                        onFocus={onFocusHandler}
                    />
                </div>
                <small className={styles.error}>{error.town}</small>

                <div className="form-group">
                    <label htmlFor="country">
                        Държава <small className="error">*</small>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="country"
                        id="country"
                        placeholder="Държава"
                        value={country}
                        onChange={changeHandler}
                        onBlur={validateHandler}
                        onFocus={onFocusHandler}
                    />
                </div>
                <small className={styles.error}>{error.country}</small>

                <div className="form-group">
                    <label htmlFor="address">Адрес</label>
                    <input
                        type="text"
                        className="form-control"
                        name="address"
                        placeholder="Адрес"
                        value={address}
                        onChange={changeHandler}
                        onFocus={onFocusHandler}
                    />
                </div>
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
                        to="/register/identity"
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
