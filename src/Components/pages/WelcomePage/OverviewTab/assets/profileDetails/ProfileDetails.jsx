// import profilePicture from "../../../images/medium-shot-happy-man-smiling.jpg"
import { Link } from "react-router-dom";
import blocks from "../../../custom-block.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

export const ProfileDetails = ({ email, phone, name, picture }) => {
    return (
        <div className={`${blocks.customBlock} ${blocks.customBlockProfile}`}>
            <div className={blocks.customBlockProfileImageWrap}>
                <img
                    src={picture}
                    className={blocks.customBlockProfileImage}
                    alt="profile"
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
                <strong>Е-майл:</strong>
                <span> {email}</span>
            </p>
            <p style={{ paddingBottom: "0" }}>
                <strong>Телефон:</strong>
                <span> {phone}</span>
            </p>
        </div>
    );
};
