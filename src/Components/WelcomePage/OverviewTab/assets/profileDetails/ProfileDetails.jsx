// import profilePicture from "../../../images/medium-shot-happy-man-smiling.jpg"
import { Link } from "react-router-dom";
import "./profileDetails.css";
export const ProfileDetails = ({ email, phone, name, picture }) => {
    return (
        <div className="custom-block custom-block-profile-front custom-block-profile">
            <div className="custom-block-profile-image-wrap">
                <img
                    src={picture}
                    className="custom-block-profile-image "
                    alt="happy Man"
                />

                <Link
                    to="/dashboard/settings"
                    className="bi-pencil-square custom-block-edit-icon"
                ></Link>
            </div>

            <p>
                <strong>Име:</strong>

                <span>{name}</span>
            </p>
            <p>
                <strong>Е-майл:</strong>
                <span>{email}</span>
            </p>
            <p style={{ paddingBottom: "0" }}>
                <strong>Телефон:</strong>
                <span>{phone}</span>
            </p>
        </div>
    );
};
