// import profilePicture from "../../../images/medium-shot-happy-man-smiling.jpg"
import { Link } from "react-router-dom";

export const ProfileDetails = ({ email, phone, name, picture }) => {
    return (
        <div className="custom-block custom-block-profile-front custom-block-profile text-center bg-white">
            <div className="custom-block-profile-image-wrap mb-5">
                <img
                    src={picture}
                    className="custom-block-profile-image img-fluid"
                    alt="happy Man"
                />

                <Link
                    to="settings"
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
