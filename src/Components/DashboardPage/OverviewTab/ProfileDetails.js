// import profilePicture from "../../../images/medium-shot-happy-man-smiling.jpg"
import { Link } from "react-router-dom";

export const ProfileDetails = ({ email, phone, name, picture }) => {
    return (
        <div className="custom-block custom-block-profile-front custom-block-profile text-center bg-white">
            <div className="custom-block-profile-image-wrap mb-4">
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
            
            <p className="d-flex flex-wrap mb-2">
                <strong>Име:</strong>

                <span>{name}</span>
            </p>
            <p className="d-flex flex-wrap mb-2">
                <strong>Е-майл:</strong>
                <span>{email}</span>
            </p>
            <p className="d-flex flex-wrap mb-0">
                <strong>Телефон:</strong>
                <span>{phone}</span>
            </p>
        </div>
    );
};
