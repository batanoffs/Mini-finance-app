import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../../../contexts/AuthContext";
import blocks from "../../custom-block.module.css";


export const ProfileTab = () => {
    // TO DO PICTURE
    const props = {
        name: "file",
        action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
        headers: {
            authorization: "authorization-text",
        },
        onChange(info) {
            if (info.file.status !== "uploading") {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === "done") {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    const { name, phone, picture, email } = useContext(AuthContext);

    const [state, setState] = useState({
        fullname: name,
        email: email,
        phone_number: phone,
        picture: "",
    });

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setState((prev) => ({ ...prev, [name]: value }));
    };

    const onResetHandler = () => {
        console.log("resetted");
    };

    const onUpdateHandler = () => {
        console.log("updated");
    };
    return (
        <div className="form-container">
            <div className="form-content">
                <form className="custom-form" method="post">
                    <field className="form-group">
                        <img
                            src={picture}
                            className={blocks.customBlockProfileImage}
                            alt="person"
                            value={state.picture}
                            onChange={inputChangeHandler}
                        />
                        <Upload {...props}>
                            <Button icon={<UploadOutlined />}>
                                Прикачи снимка
                            </Button>
                        </Upload>
                    </field>
                    <field className="form-group">
                        <label htmlFor="profile-name">Име и фамилия</label>
                        <input
                            className="form-control"
                            type="text"
                            name="profile-name"
                            id="profile-name"
                            value={state.fullname}
                            onChange={inputChangeHandler}
                            placeholder="Име и фамилия"
                        />
                    </field>
                    <field className="form-group">
                        <label htmlFor="profile-email">Email</label>
                        <input
                            className="form-control"
                            type="email"
                            name="profile-email"
                            value={state.email}
                            onChange={inputChangeHandler}
                            id="profile-email"
                            placeholder="email"
                        />
                    </field>
                    <field className="form-group">
                        <label htmlFor="phone_number">Телефонен номер</label>
                        <input
                            type="number"
                            name="phone_number"
                            value={state.phone_number}
                            onChange={inputChangeHandler}
                            autoComplete="off"
                            placeholder="Телефонен номер"
                            className="form-control mb-3"
                        />
                    </field>

                    <footer>
                        <input
                            type="button"
                            onClick={onResetHandler}
                            className="button-secondary"
                            value="Изчисти"
                        />

                        <input
                            type="submit"
                            onClick={onUpdateHandler}
                            className="button-primary"
                            value="Запази промени"
                        />
                    </footer>
                </form>
            </div>
        </div>
    );
};
