import blocks from "../custom-block.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export const SendMoney = () => {
    const person1 = "https://notablepen.backendless.app/api/files/app/AppData/people/medium-shot-happy-man-smiling.jpg";
    const person2 = "https://notablepen.backendless.app/api/files/app/AppData/people/senior-man-white-sweater-eyeglasses.jpg";
    const person3 = "https://notablepen.backendless.app/api/files/app/AppData/people/young-beautiful-woman-pink-warm-sweater.jpg";

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
