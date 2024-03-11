import blocks from "../custom-block.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { dataService } from "../../../../services/userDataService";
import { AuthContext } from "../../../../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";

export const QuickSendMoney = () => {
    const [friends, setFriends] = useState([]);
    const { userDataId, token } = useContext(AuthContext);

    useEffect(() => {
        if (!userDataId) {
            console.error("QuickSendMoney.userDataId is null");
            return;
        }
        dataService
            .getAllFrineds(userDataId)
            .then((response) => {
                if (!response) {
                    console.error("QuickSendMoney.response is null");
                    return;
                }
                setFriends(response);
            })
            .catch((error) => {
                console.error("QuickSendMoney.error", error);
            });
    }, [userDataId]);


    return (
        <div className={`${blocks.customBlock} ${blocks.primaryBg}`}>
            <h5 style={{ color: "var(--section-bg-color)" }}>
                Бързо изпращане
            </h5>
            <ul className={blocks.sendMonkeyContainer}>
                {friends.map((friend) => (
                    <li key={friend.objectId}>
                        <img
                            src={friend.avatar}
                            className={blocks.profileImage}
                            alt={"avatar"}
                            onClick={() => {
                                console.log(friend.objectId);
                            }}
                        />
                    </li>
                ))}
                <FontAwesomeIcon
                    className={`${blocks.profileRounded} ${blocks.profileRoundedIcon}`}
                    icon={faPlus}
                />
            </ul>
        </div>
    );
};
