// import profilePicture from "../../../images/medium-shot-happy-man-smiling.jpg"
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import blocks from "../../../custom-block.module.css";

export const ProfileDetails = ({ email, phone, name, picture, adress, country }) => {
    return (
        <div className={`${blocks.customBlock} ${blocks.customBlockProfile}`}>
            <div className={blocks.customBlockProfileImageWrap}>
                <img
                    src={picture}
                    className={blocks.customBlockProfileImage}
                    alt="avatar"
                />

                <Link
                    to="/dashboard/settings"
                    className={blocks.customBlockEditIcon}
                >
                   <FontAwesomeIcon icon={faPenToSquare} />
                </Link>
            </div>

            <p>
                <strong>Име:</strong>

                <span> {name}</span>
            </p>
            <p>
                <strong>Имейл:</strong>
                <span> {email}</span>
            </p>
            <p style={{ paddingBottom: "0" }}>
                <strong>Телефон:</strong>
                <span> {phone}</span>
            </p>
            {country && <p><strong>Държава:</strong><span> {country}</span></p>}
            {adress &&<p><strong>Адрес:</strong><span>{adress}</span></p>}
        </div>
    );
};