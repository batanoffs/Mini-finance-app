import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import styles from "../quicksend.module.css";

export const ActionsMenu = ({
    showFavouritesHandler,
    setShowBtns,
    showActionsHandler,
}) => {
    const onChangeHandler = (e) => {
        const menuElement = e.currentTarget.parentElement;
        const divElement = e.currentTarget.parentElement.parentElement;
        menuElement.style.display =
            menuElement.style.display === "block" ? "none" : "block";
        divElement.style.display =
            divElement.style.display === "block" ? "none" : "block";
        setShowBtns((prevState) => !prevState);
    };

    const onAddHandller = (e) => {
        showFavouritesHandler(e);
        const menuElement = e.currentTarget.parentElement;
        const divElement = e.currentTarget.parentElement.parentElement;
        divElement.style.display =
            divElement.style.display === "block" ? "none" : "block";
        menuElement.style.display =
            menuElement.style.display === "block" ? "none" : "block";
    };
    return (
        <>
            <FontAwesomeIcon
                icon={faEllipsisV}
                className={styles.threeDotsIcon}
                onClick={showActionsHandler}
            />

            <div className={styles.actionButtons}>
                <ul>
                    <li
                        className={styles.actionButton}
                        onClick={onChangeHandler}
                    >
                        промени
                    </li>
                    <li className={styles.actionButton} onClick={onAddHandller}>
                        добави
                    </li>
                </ul>
            </div>
        </>
    );
};
