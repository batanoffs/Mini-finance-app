import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import styles from "../quicksend.module.css";

export const ActionsMenu = ({showFavouritesHandler, setShowBtns, showActionsHandler, closeMenuHandler}) => {
    return (
        <>
            <FontAwesomeIcon
                icon={faEllipsisV}
                className={styles.threeDotsIcon}
                onClick={showActionsHandler}
            />

            <div className={styles.actionButtons} onMouseOut={closeMenuHandler}>
                <ul>
                    <li
                        className={styles.actionButton}
                        onClick={() => setShowBtns((prevState) => !prevState)}
                    >
                        промени
                    </li>
                    <li
                        className={styles.actionButton}
                        onClick={showFavouritesHandler}
                    >
                        добави
                    </li>
                </ul>
            </div>
        </>
    );
};
