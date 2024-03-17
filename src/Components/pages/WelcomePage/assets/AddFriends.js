import { useState, useContext } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";
import { notifications } from "../../../../services/notificationService";
import { dataService } from "../../../../services/userDataService";
import { App } from 'antd';
import blocks from "../custom-block.module.css";
import styles from "./addfriends.module.css";

export const AddFriends = () => {
    const [number, setNumber] = useState("");
    const [error, setError] = useState(false);
    const { userDataId, token, phone, friends } = useContext(AuthContext);
    const { message } = App.useApp();


    //TODO update friends state
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
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            if (!number) {
                throw new Error("Липсва телефонен номер");
            }
            if (number === phone) {
                throw new Error("Не може да добавяте себе си");
            }

            const findReceiver = await dataService.getAttribute(
                "phoneNumber",
                number
            );
            if (!findReceiver || findReceiver.length === 0) {
                throw new Error("Потребителят с този телефонен номер не съществува");
            }

            const receiver = findReceiver[0].objectId;
            const findFriend = friends?.some((friend) => friend.objectId === receiver);
            console.log(friends);
            console.log(findFriend);

            if (findFriend) {
                throw new Error("Потребителят вече е ваш приятел");
            }
            // GET NOTIFICATIONS AND FILTER FOR SENDER RECEIVER
            const allFriendRequestNotifications = await notifications.getAllFriendRequests(token);
            if (!allFriendRequestNotifications) {
                throw new Error("Failed to fetch friend request notifications");
            }
            const checkFriendNotification = allFriendRequestNotifications.filter(
                (request) =>
                    (request.receiver?.length &&
                        request.receiver[0].objectId === receiver &&
                        request.sender[0].objectId === userDataId) ||
                    (request.receiver?.length &&
                        request.receiver[0].objectId === userDataId &&
                        request.sender[0].objectId === receiver)
            );
            //CHECK IF FILTERED NOTIFICATIONS EXIST
            if (checkFriendNotification.length === 0) {
                const response = await notifications.createNotification(
                    number,
                    null,
                    "friend request",
                    userDataId,
                    token
                );

                if (!response || !response.success) {
                    throw new Error("Failed to send friend request");
                }
                showMessage("success", "Successfully sent friend request");
            } else {
                const status = checkFriendNotification[0]?.status;
                const responseAction =
                    status === "pending" ?
                        new Error("Вече сте направили заявка за приятелство") :
                        status === "accepted" ?
                            new Error("Вие сте приятел") :
                            status === "declined" ?
                                await notifications.updateFriendRequestStatus(
                                    checkFriendNotification[0].objectId,
                                    "pending",
                                    false,
                                    token
                                ) :
                                null;

                if (responseAction instanceof Error) {
                    throw responseAction;
                } else if (responseAction) {
                    showMessage("success", "Поканата за приятелство е изпратена");
                } else {
                    throw new Error("Грешка при приемането на заявката");
                }
            }
        } catch (error) {
            console.error(error);
            showMessage("error", error.message);
        }
        setNumber("");
    };

    return (
        <div className={`${blocks.customBlockContact}`}>
            <header>
                <h5>Добави приятел</h5>
            </header>
            <form onSubmit={onSubmit} className={styles.friendsForm}>
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
                <input
                    type="submit"
                    className="custom-btn"
                    value="Добави"
                />
            </form>
        </div>
    );
};
