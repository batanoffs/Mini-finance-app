import { useState, useContext, useEffect } from "react";
import { dataService } from "../../../../../services/userDataService";
import { AuthContext } from "../../../../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill, faPiggyBank, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { App } from "antd";
import blocks from "../../custom-block.module.css";
import styles from "./friends.module.css";
import { notifications } from "../../../../../services/notificationService";

export const Friends = () => {
    const { userDataId, token } = useContext(AuthContext);
    const [userFriends, setUserFriends] = useState([]);
    const { message } = App.useApp();

    useEffect(() => {
        dataService
            .getRelation(userDataId, "friends")
            .then((response) => setUserFriends(response?.friends || []));
    }, [userDataId]);

    const showMessage = (type, text) => {
        type === "error"
            ? message.error(text)
            : type === "success"
            ? message.success(text)
            : type === "warning"
            ? message.warning(text)
            : type === "info"
            ? message.info(text)
            : message(text);
    };

    const onRemoveFriend = async (e) => {
        const friendId = e.currentTarget.parentElement.parentElement.getAttribute("data-key");

        try {
            const allFriendRequestNotifications = await notifications.getAllFriendRequests(token);
            if (!allFriendRequestNotifications) {
                throw new Error("Failed to fetch friend request notifications");
            }

            const checkFriendNotification = allFriendRequestNotifications.filter((request) => {
                return (
                    (request.receiver?.length &&
                        request.receiver[0].objectId === friendId &&
                        request.sender[0].objectId === userDataId) ||
                    (request.receiver?.length &&
                        request.receiver[0].objectId === userDataId &&
                        request.sender[0].objectId === friendId)
                );
            });

            await notifications.deleteNotification(checkFriendNotification[0].objectId);
            await dataService.removeRelation(userDataId, "friends", friendId, token);
            await dataService.removeRelation(friendId, "friends", userDataId, token);

            setUserFriends(userFriends.filter((friend) => friend.objectId !== friendId));

            const response = await dataService.getRelation(userDataId, "friends");
            setUserFriends(response?.friends || []);
            showMessage("success", "Успешно премахнат приятел");
        } catch (error) {
            showMessage("error", error.message);
            console.error(error);
        }
    };

    return (
        <div className={`${blocks.customBlock} ${blocks.customBlockProfile}`}>
            <h5>Приятели</h5>
            <ul className={styles.friendsList}>
                {userFriends.map((friend) => {
                    if (!friend) {
                        return null;
                    }
                    return (
                        <li key={friend.objectId} data-key={friend.objectId}>
                            <img
                                src={friend.avatar}
                                className={styles.profileImage}
                                alt={"avatar"}
                            />
                            <div className={styles.friendInfo}>
                                <strong>{friend.fullName}</strong>
                                <p>{friend.email}</p>
                                <p>{friend.phone}</p>
                                <p>{friend.country}</p>
                            </div>
                            <div className={styles.friendButtons}>
                                <button
                                    className={styles.friendButton}
                                    data-text="Поискай пари"
                                >
                                    <FontAwesomeIcon
                                        className={styles.icon}
                                        icon={faMoneyBill}
                                    />
                                </button>
                                <button
                                    className={styles.friendButton}
                                    data-text="Изпрати пари"
                                >
                                    <FontAwesomeIcon
                                        className={styles.icon}
                                        icon={faPiggyBank}
                                    />
                                </button>
                                <button
                                    className={styles.friendButton}
                                    data-text="Премахни приятел"
                                    onClick={onRemoveFriend}
                                >
                                    <FontAwesomeIcon
                                        className={styles.icon}
                                        icon={faTrashAlt}
                                    />
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
