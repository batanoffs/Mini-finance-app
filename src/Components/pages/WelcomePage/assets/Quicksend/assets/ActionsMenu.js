import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import styles from "../quicksend.module.css";


export const ActionsMenu = ({setShowFavourites, setShowBtns, showActionsHandler, closeMenuHandler}) => {

    return (
        <>
            <FontAwesomeIcon
                icon={faEllipsisV}
                className={styles.ellipsisIcon}
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
                        onClick={() => setShowFavourites(true)}
                    >
                        добави
                    </li>
                </ul>
            </div>
        </>
    );
};
