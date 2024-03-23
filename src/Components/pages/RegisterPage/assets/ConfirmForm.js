import { Link, useNavigate } from "react-router-dom";
import { Radio } from "antd";
import { useState } from "react";
import { App } from "antd";
export const ConfirmForm = ({
    email,
    password,
    firstName,
    lastName,
    gender,
    country,
    phoneNumber,
    cardId,
    address,
    town,
    currentStepsHandler,
    onSubmitRegister,
    changeHandler,
}) => {
    const [isHidden, setHidden] = useState(false);
    const navigate = useNavigate();
    const { message } = App.useApp();

    const showMessage = (type, text) => {
        type === "error" ? message.error(text) :
        type === "success" ? message.success(text) :
        type === "warning" ? message.warning(text) :
        type === "info" ? message.info(text) :
        message(text);
    };
    const cardIdGenerator = () => {

        const id = Math.floor(Math.random() * 100) + 1;
        //TODO check if this id has not already been assigned to current users
        //maybe make request to userData check ids
        return id;
    };
    const onConfirmHandler = (e) => {
        e.preventDefault();
        e.target.hidden = true;
        setHidden(true);
        changeHandler({ target: { name: "cardId", value: cardIdGenerator() } });
    };

    const onRegisterSubmitHandler = async (e) => {
        e.preventDefault();
        const response = await onSubmitRegister(e);
        if (response) {
            navigate("/login");
            showMessage("success", "Успешна регистрация, влезте в профила си");
        } else {
            console.error("response is null", response);
            showMessage("error", "Неуспешна регистрация");
        }
    }
    return (
        <div className="form-container">
            <div className="form-content">
                <form
                    style={{ display: `inline-flex`, flexDirection: `column` }}
                    action="#"
                    method="post"
                >
                    <header>
                        <h5>Проверка на данните</h5>
                    </header>
                    <div className="form-group">
                        <label htmlFor="email">Е-майл</label>
                        <input
                            type="email"
                            name="email"
                            readOnly
                            autoComplete="off"
                            placeholder="липсва информация"
                            className="form-control"
                            value={email}
                            onChange={changeHandler}
                            id="email"
                        />
                    </div>
                    <input
                        type="id"
                        name="cardId"
                        readOnly
                        hidden
                        autoComplete="off"
                        placeholder="липсва информация"
                        className="form-control"
                        value={cardId}
                        onChange={changeHandler}
                        id="cardId"
                    />
                    <input
                        type="password"
                        name="password"
                        readOnly
                        hidden
                        autoComplete="off"
                        placeholder="липсва информация"
                        className="form-control"
                        value={password}
                        onChange={changeHandler}
                        id="password"
                    />

                    <div className="form-group">
                        <label htmlFor="firstName">Име</label>
                        <input
                            type="text"
                            className="form-control"
                            name="firstName"
                            placeholder="липсва информация"
                            value={firstName}
                            onChange={changeHandler}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Фамилия</label>
                        <input
                            type="text"
                            className="form-control"
                            name="lastName"
                            placeholder="липсва информация"
                            value={lastName}
                            onChange={changeHandler}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label>Пол</label>
                        <Radio.Group
                            name="gender"
                            value={gender}
                            onChange={changeHandler}
                            disabled
                            style={{
                                marginBottom: "0.5rem",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Radio value="male"> Мъж </Radio>
                            <Radio value="female"> Жена </Radio>
                        </Radio.Group>
                    </div>

                    <div className="form-group">
                        <label htmlFor="phoneNumber">Телефон</label>
                        <input
                            type="tel"
                            className="form-control"
                            name="phoneNumber"
                            placeholder="липсва информация"
                            value={phoneNumber}
                            onChange={changeHandler}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Адрес</label>
                        <input
                            type="text"
                            className="form-control"
                            name="address"
                            placeholder="липсва информация"
                            value={address}
                            onChange={changeHandler}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="town">Град</label>
                        <input
                            type="text"
                            className="form-control"
                            name="town"
                            placeholder="липсва информация"
                            value={town}
                            onChange={changeHandler}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="country">Държава</label>
                        <input
                            type="text"
                            className="form-control"
                            name="country"
                            id="country"
                            placeholder="липсва информация"
                            value={country}
                            onChange={changeHandler}
                            disabled
                        />
                    </div>
                </form>
                <footer>
                    <Link
                        type="button"
                        name="prev"
                        to={"/register/terms"}
                        className="button-secondary"
                        onClick={currentStepsHandler}
                    >
                        Назад
                    </Link>

                    <input
                        name="register"
                        type="button"
                        className="button-primary"
                        value={"Потвърди данните"}
                        onClick={onConfirmHandler}
                    />
                    {isHidden && (
                        <input
                            name="register"
                            type="submit"
                            className="button-primary"
                            value={"Регистрация"}
                            onClick={onRegisterSubmitHandler}
                        />
                    )}
                </footer>
            </div>
        </div>
    );
};
