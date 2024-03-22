import { dataService } from "../../../../../../services/userDataService";
import { AuthContext } from "../../../../../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import styles from "../quicksend.module.css";

export const Actions = ({
    friend,
    showActionsHandler,
    closeMenuHandler,
    showMessage,
}) => {
    const { favorites, auth, setAuth, userDataId, token } = useContext(AuthContext);

    const onConfirmHandler = (e) => {
        if (!e) {
            console.error("NullPointerException: e is null");
            return;
        }
        const target = e.currentTarget;
        if (!target) {
            console.error("NullPointerException: target is null");
            return;
        }
        const friendId = target.getAttribute("data-key");
        if (!friendId) {
            console.error("NullPointerException: friendId is null");
            return;
        }
        try {
            dataService
                .removeRelation(userDataId, "favorite_friends", friendId, token)
                .then(() => {
                    showMessage("success", "Успешно премахнат приятел от списъка");
                    setAuth({
                        ...auth,
                        favorite_friends: favorites.filter(
                            (favorite) => favorite.objectId !== friendId
                        )});
                        // hide fontawesomeicon with showactionshandler
                    showActionsHandler();
                })
                .catch((error) => {
                    console.error(error);
                    showMessage("error", error.message);
                });
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            <FontAwesomeIcon
                className={styles.deleteIconBtn}
                icon={faTimes}
                onClick={showActionsHandler}
            />
            <div className={styles.actionButtons} onMouseOut={closeMenuHandler}>
                <ul>
                    <li
                        className={styles.actionButton}
                        data-key={friend.objectId}
                        onClick={onConfirmHandler}
                    >
                        изтрий
                    </li>
                </ul>
            </div>
        </>
    );
};
