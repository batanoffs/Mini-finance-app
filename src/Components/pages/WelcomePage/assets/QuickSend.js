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
        dataService.getAllFrineds(userDataId).then((response) => {
            setFriends(response);
            console.log(response);
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
