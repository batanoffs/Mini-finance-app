import { useState, useContext } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";
import { notifications } from "../../../../services/notificationService";
import { Button, App, Space } from 'antd';
import blocks from "../custom-block.module.css";
import styles from "./addfriends.module.css";
import { dataService } from "../../../../services/userDataService";

export const AddFriends = () => {
    const [number, setNumber] = useState("");
    const [error, setError] = useState(false);
    const { userDataId, token } = useContext(AuthContext);
    const { message } = App.useApp();


    const onChangeNumber = (e) => {
        setNumber(e.target.value);
    };

    const onFocusClearErrorHandler = (e) => {
        e.target.style.border = `1px solid var(--primary-hover-color)`;
        setError(false);
    };

    const showMessage = (type, text) => {
        type === "error" ? message.error(text) :
        type === "success" ? message.success(text) :
        type === "warning" ? message.warning(text) :
        type === "info" ? message.info(text) :
        message(text);
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        if (!number) {
            setError(true);
            return;
        }

        const findReceiver = await dataService.getAttribute(
            "phoneNumber",
            number
        );
        const receiver = findReceiver[0].objectId;
        const allFriendRequestsResponse =
            await notifications.getAllFriendRequests(token);
        let requests = allFriendRequestsResponse;
        const filtered = requests.filter(
            (request) =>
                request.receiver?.length &&
                request.receiver[0].objectId === receiver &&
                request.sender[0].objectId === userDataId
        );

        if (filtered.length === 0) {
            const response = await notifications.createNotification(
                number,
                null,
                "friend request",
                userDataId,
                token
            );

            if (response.success) {
                showMessage("success", "Успешно изпратихте покана за приятелство");
            } else {
                showMessage("error", "Потребител с такъв номер не е намерен");
            }
            setNumber("");
        } else {
            showMessage("warning", "Потребителят вече ви е приятел.");
        }
    };

    return (
        <div className={`${blocks.customBlockContact}`}>
            <header>
                <h5>Добави приятел</h5>
            </header>
            <form className={styles.friendsForm}>
                {error ? (
                    <small style={{ color: "red" }}>
                        липсва телефонен номер
                    </small>
                ) : null}
                <input
                    type="text"
                    placeholder="телефон"
                    onBlur={(e) => {
                        if (!number) {
                            e.target.style.border = `1px solid transparent`;
                        }
                    }}
                    required
                    value={number}
                    onChange={onChangeNumber}
                    onFocus={onFocusClearErrorHandler}
                />
                <Space>
                    <Button
                        data-key={alert.objectId}
                        type="primary"
                        className="custom-btn"
                        onClick={onSubmit}
                    >
                        Добави
                    </Button>
                </Space>
            </form>
        </div>
    );
};
