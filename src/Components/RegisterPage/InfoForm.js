import { Link } from "react-router-dom";
import { Radio } from "antd";

export const InfoForm = ({
    firstName,
    lastName,
    gender,
    picture,
    phoneNumber,
    adress,
    town,
    country,
    changeHandler,
}) => {
    return (
        <section className="form-container">
            <div className="form-content">
                <header>
                    <h6>Моля, въведете вашите лични данни във формата</h6>
                </header>
                <form>
                    <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        placeholder="Име"
                        value={firstName}
                        onChange={changeHandler}
                    />

                    <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        placeholder="Фамилия"
                        value={lastName}
                        onChange={changeHandler}
                    />
                    <label>Пол: </label>
                    <Radio.Group
                        name="gender"
                        value={gender}
                        onChange={changeHandler}
                    >
                        <Radio value="male"> Мъж </Radio>
                        <Radio value="female"> Жена </Radio>
                    </Radio.Group>
                    <div style={{ display: "flex", marginTop: "1em" }}>
                        <label htmlFor="file">Профилна снимка:</label>
                        <input
                            type="file"
                            className="form-control"
                            name="picture"
                            accept="image/*"
                            id="file"
                            placeholder="Профилна снимка"
                            value={picture}
                            onChange={changeHandler}
                        />
                    </div>
                    <input
                        type="tel"
                        className="form-control"
                        name="phoneNumber"
                        placeholder="Телефон"
                        value={phoneNumber}
                        onChange={changeHandler}
                    />

                    <input
                        type="text"
                        className="form-control"
                        name="adress"
                        placeholder="Адрес"
                        value={adress}
                        onChange={changeHandler}
                    />

                    <input
                        type="text"
                        className="form-control"
                        name="town"
                        placeholder="Град"
                        value={town}
                        onChange={changeHandler}
                    />

                    <input
                        type="text"
                        className="form-control"
                        name="country"
                        id="country"
                        placeholder="Държава"
                        value={country}
                        onChange={changeHandler}
                    />
                </form>
                <footer>
                    <Link
                        to={"/register"}
                        style={{ width: "150px", textAlign: "center" }}
                        type="submit"
                        name="submit"
                        className="button-secondary"
                    >
                        Назад
                    </Link>
                    <Link
                        to={"/register/creditcard"}
                        style={{ width: "150px", textAlign: "center" }}
                        type="submit"
                        name="submit"
                        className="button-primary"
                    >
                        Напред
                    </Link>
                </footer>
            </div>
        </section>
    );
};
