import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faTimes } from "@fortawesome/free-solid-svg-icons";
import { dataService } from "../../../../../services/userDataService";
import { AuthContext } from "../../../../../contexts/AuthContext";
import { useContext, useState } from "react";
import { AddToFavorites } from "./AddFavourites";
import { App } from "antd";
import blocks from "../../custom-block.module.css";
import styles from "./quicksend.module.css";

export const QuickSendMoney = ({ showModal, setShowModal, userInput, setUserInput }) => {
    const [showFavourites, setShowFavourites] = useState(false);
    const [showBtns, setShowBtns] = useState(false);
    const { favorites, userDataId, token } = useContext(AuthContext);
    const { message } = App.useApp();

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

    const openSendMenu = (event) => {
        const name = event.currentTarget.parentElement.getAttribute("data-key");
        if (!name) {
            showMessage("error", "Възникна грешка, опитайте отново");
            return;
        }
        setShowModal({ ...showModal, [`send`]: true });
        setUserInput({ ...userInput, [`favorites`]: name });
    };

    const showActionsHandler = (e) => {
        const tooltip = e.currentTarget.nextElementSibling;
        tooltip.style.display = tooltip.style.display === "block" ? "none" : "block";
    };

    const closeMenuHandler = (e) => {
        e.currentTarget.style.display = e.currentTarget.style.display === "block" ? "none" : "block";
    };

    const onConfirmHandler = (e) => {
        const friendId = e.currentTarget.getAttribute("data-key");
        if (!friendId) {
            showMessage("error", "Възникна грешка, опитайте отново");
            return;
        }
        dataService
            .removeRelation(userDataId, "favorite_friends", friendId, token)
            .then(() => showMessage("success", "Успешно премахнат приятел"))
            .catch((error) => {
                console.error(error);
                showMessage("error", error.message);
            });
    };

    return (
        <div className={`${blocks.customBlock} ${blocks.primaryBg}`}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h5 style={{ color: "var(--section-bg-color)" }}>
                    Бързо изпращане
                </h5>
                <FontAwesomeIcon
                    icon={faEllipsisV}
                    className={styles.ellipsisIcon}
                    onClick={showActionsHandler}
                />

                <div
                    className={styles.actionButtons}
                    onMouseOut={closeMenuHandler}
                >
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
            </div>

            <ul className={blocks.sendMonkeyContainer}>
                {favorites?.map((friend) => (
                    <li
                        key={friend.objectId}
                        data-key={friend.fullName}
                        style={{ position: "relative" }}
                    >
                        <img
                            src={friend.avatar}
                            className={styles.profileImage}
                            alt={"avatar"}
                            onClick={openSendMenu}
                        />
                        {showBtns && (
                            <>
                                <FontAwesomeIcon
                                    className={styles.deleteIconBtn}
                                    icon={faTimes}
                                    onClick={showActionsHandler}
                                />
                                <div
                                    className={styles.actionButtons}
                                    onMouseOut={closeMenuHandler}
                                >
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
                        )}
                    </li>
                ))}
                {showFavourites && (
                    <AddToFavorites setShowFavourites={setShowFavourites} />
                )}
            </ul>
        </div>
    );
};