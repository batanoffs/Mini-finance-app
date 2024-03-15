import { useState, useContext, useEffect } from "react";
import { dataService } from "../../../../../services/userDataService";
import { AuthContext } from "../../../../../contexts/AuthContext";
import blocks from "../../custom-block.module.css";
import styles from "./friends.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMoneyBill,
    faPiggyBank,
    faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { App } from "antd";

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

    const onRemoveFriend = (e) => {
        const friendId =
            e.currentTarget.parentElement.parentElement.getAttribute(
                "data-key"
            );
        dataService
            .removeRelation(userDataId, "friends", friendId, token)
            .then((response) => {
                if (!response) {
                    showMessage("error", "Неуспешно премахнат приятел");
                    return;
                }
                if (!response.success) {
                    showMessage("error", "Неуспешно премахнат приятел");
                    return;
                }
                setUserFriends(
                    userFriends.filter((friend) => friend.objectId !== friendId)
                );
                dataService
                    .getRelation(userDataId, "friends")
                    .then((response) =>
                        setUserFriends(response?.friends || [])
                    );
                showMessage("success", "Успешно премахнат приятел");
            })
            .catch((error) => {
                showMessage("error", "Неуспешно премахнат приятел");
                console.log(error);
            });
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
