import { Link } from "react-router-dom";
import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Upload, Radio } from "antd";

export const InfoForm = () => {
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
                        id="name"
                        placeholder="Име"
                    />

                    <input
                        type="text"
                        className="form-control"
                        id="surname"
                        placeholder="Фамилия"
                    />
                    <label>Пол: </label>
                    <Radio.Group>
                        <Radio value="apple"> Мъж </Radio>
                        <Radio value="pear"> Жена </Radio>
                    </Radio.Group>

                    <Upload action="/upload.do" listType="picture-card">
                        <button
                            style={{
                                border: 0,
                                background: "none",
                            }}
                            type="button"
                        >
                            <PlusOutlined />
                            <div
                                style={{
                                    marginTop: 8,
                                    fontSize: 12,
                                    fontFamily: "Montserrat Alternates",
                                }}
                            >
                                Прикачи профилна на снимка
                            </div>
                        </button>
                    </Upload>

                    <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        placeholder="Телефон"
                    />

                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        placeholder="Адрес"
                    />

                    <input
                        type="text"
                        className="form-control"
                        id="city"
                        placeholder="Град"
                    />

                    <input
                        type="text"
                        className="form-control"
                        id="country"
                        placeholder="Държава"
                    />

                    <input
                        type="text"
                        className="form-control"
                        id="zip"
                        placeholder="Пощенски код"
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
