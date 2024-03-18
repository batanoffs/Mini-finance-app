import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { dataService } from "../../../../../services/userDataService";
import { AuthContext } from "../../../../../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import { AddToFavorites } from "./AddFavourites";
import { App } from 'antd';
import blocks from "../../custom-block.module.css";

export const QuickSendMoney = ({showModal, setShowModal, userInput, setUserInput}) => {
    const [showFavourites, setShowFavourites] = useState(false);
    const { userDataId, auth, setAuth } = useContext(AuthContext);
    const { message } = App.useApp();

    const showMessage = (type, text) => {
        type === "error" ? message.error(text) :
        type === "success" ? message.success(text) :
        type === "warning" ? message.warning(text) :
        type === "info" ? message.info(text) :
        message(text);
    };

    const onClickHandler = (e) => {
        const friend = e.currentTarget.parentElement.getAttribute("data-key");
        setShowModal({ ...showModal, [`send`]: true });
        setUserInput({ ...userInput, [`friends`]: friend });
    };

    const addToFavoritesHandler = () => {
        setShowFavourites(true);
    };

    return (
        <div className={`${blocks.customBlock} ${blocks.primaryBg}`}>
            <h5 style={{ color: "var(--section-bg-color)" }}>
                Бързо изпращане
            </h5>
            <ul className={blocks.sendMonkeyContainer}>
                {auth.friends?.map((friend) => (
                    <li key={friend.objectId} data-key={friend.fullName}>
                        <img
                            src={friend.avatar}
                            className={blocks.profileImage}
                            alt={"avatar"}
                            onClick={onClickHandler}
                        />
                    </li>
                ))}
                <FontAwesomeIcon
                    className={`${blocks.profileRounded} ${blocks.profileRoundedIcon}`}
                    icon={faPlus}
                    onClick={addToFavoritesHandler}
                />
                {showFavourites && <AddToFavorites showFavourites={showFavourites} setShowFavourites={setShowFavourites} />}
            </ul>
        </div>
    );
};

