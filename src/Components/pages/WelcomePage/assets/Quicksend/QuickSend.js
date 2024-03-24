import { AuthContext } from "../../../../../contexts/AuthContext";
import { useContext, useState } from "react";
import { AddToFavorites } from "./AddFavourites";
import blocks from "../../custom-block.module.css";
import styles from "./quicksend.module.css";
import { Actions } from "./assets/Actions";
import { ActionsMenu } from "./assets/ActionsMenu";
import { useMessage } from "../../../../../hooks/useMessage";

export const QuickSendMoney = ({ showModal, setShowModal, userInput, setUserInput }) => {
    const [showFavourites, setShowFavourites] = useState(false);
    const [showBtns, setShowBtns] = useState(false);
    const { favorites } = useContext(AuthContext);
    const showMessage = useMessage();

    const openSendMenu = (event) => {
        const name = event.currentTarget.parentElement.getAttribute("data-key");
        if (!name) {
            showMessage("error", "Възникна грешка, опитайте отново");
            return;
        }
        setShowModal({ ...showModal, [`send`]: true });
        setUserInput({ ...userInput, [`friends`]: name });
    };

    const showActionsHandler = (e) => {
        const tooltip = e.currentTarget.nextElementSibling;
        console.log(tooltip);
        tooltip.style.display = tooltip.style.display === "block" ? "none" : "block";
    };

    const closeMenuHandler = (e) => {
        e.currentTarget.style.display = e.currentTarget.style.display === "block" ? "none" : "block";
    };

    return (
        <div className={`${blocks.customBlock} ${blocks.primaryBg}`}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h5 style={{ color: "var(--section-bg-color)" }}>
                    Бързо изпращане
                </h5>
                <ActionsMenu setShowBtns={setShowBtns} closeMenuHandler={closeMenuHandler} showActionsHandler={showActionsHandler} setShowFavourites={setShowFavourites}/>
            </div>

            <ul className={blocks.sendMonkeyContainer}>
                {favorites.length > 0 ? favorites?.map((friend) => (
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
                        {showBtns && <Actions setShowBtns={setShowBtns} friend={friend} showActionsHandler={showActionsHandler} closeMenuHandler={closeMenuHandler}/>}
                    </li>
                )) : (
                    <>
                        <p style={{display: "inline"}}>Добавете приятели</p>
                        <AddToFavorites setShowFavourites={setShowFavourites}/>
                    </>
                )}
                {showFavourites && (
                    <AddToFavorites setShowFavourites={setShowFavourites} />
                )}
            </ul>
        </div>
    );
};