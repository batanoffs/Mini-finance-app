import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";

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
        <div
            className="tab-pane fade show active"
            id="profile-tab-pane"
            role="tabpanel"
            aria-labelledby="profile-tab"
            tabIndex="0"
        >

            <form className="custom-form profile-form" action="#" method="post">
                <input
                    className="form-control"
                    type="text"
                    name="profile-name"
                    id="profile-name"
                    value={state.fullname}
                    onChange={inputChangeHandler}
                    placeholder="Име и фамилия"
                />

                <input
                    className="form-control"
                    type="email"
                    name="profile-email"
                    value={state.email}
                    onChange={inputChangeHandler}
                    id="profile-email"
                    placeholder="email"
                />

                <input
                    type="number"
                    name="phone_number"
                    value={state.phone_number}
                    onChange={inputChangeHandler}
                    autoComplete="off"
                    placeholder="Телефонен номер"
                    className="form-control mb-3"
                />

                <div className="input-group mb-1">
                    <img
                        src={picture}
                        className="profile-image "
                        alt="person"
                        value={state.picture}
                        onChange={inputChangeHandler}
                    />
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>
                            Click to Upload
                        </Button>
                    </Upload>
                    {/* <input
                        type="file"
                        onChange={inputChangeHandler}
                        value=""
                        className="form-control"
                        id="inputGroupFile02"
                        placeholder="Избери снимка"
                    /> */}
                </div>

                <footer style={{ display: "flex" }}>
                    <button
                        type="button"
                        onClick={onResetHandler}
                        className="button-secondary"
                    >
                        Изчисти
                    </button>

                    <button
                        type="submit"
                        onClick={onUpdateHandler}
                        className="button-primary"
                    >
                        Запази промени
                    </button>
                </footer>
            </form>
        </div>
    );
};
