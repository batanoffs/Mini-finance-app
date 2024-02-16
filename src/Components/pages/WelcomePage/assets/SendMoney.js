import person1 from "../../../../images/profile/young-woman-with-round-glasses-yellow-sweater.jpg";
import person2 from "../../../../images/profile/young-beautiful-woman-pink-warm-sweater.jpg";
import person3 from "../../../../images/profile/senior-man-white-sweater-eyeglasses.jpg";
import blocks from "../custom-block.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export const SendMoney = () => {
    return (
        <div className={`${blocks.customBlock} ${blocks.primaryBg}`}>
            <h5 style={{ color: "var(--section-bg-color)" }}>
                Бързо изпращане
            </h5>
            <div className={blocks.sendMonkeyContainer}>
                <img
                    src={person1}
                    className={blocks.profileImage}
                    alt={"person"}
                />

                <img
                    src={person2}
                    className={blocks.profileImage}
                    alt={"person"}
                />

                <img
                    src={person3}
                    className={blocks.profileImage}
                    alt={"person"}
                />
                <FontAwesomeIcon
                    className={`${blocks.profileRounded} ${blocks.profileRoundedIcon}`}
                    icon={faPlus}
                />
            </div>
        </div>
    );
};
