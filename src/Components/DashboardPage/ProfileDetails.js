import profilePicture from "../../images/medium-shot-happy-man-smiling.jpg"

export const ProfileDetails = () => {
    return (
        <div className="custom-block custom-block-profile-front custom-block-profile text-center bg-white">
            <div className="custom-block-profile-image-wrap mb-4">
                <img src={profilePicture} className="custom-block-profile-image img-fluid" alt="happy Man"/>

                <a href="settings" className="bi-pencil-square custom-block-edit-icon"></a>
            </div>

            <p className="d-flex flex-wrap mb-2">
                <strong>Name:</strong>

                <span>Thomas Edison</span>
            </p>

            <p className="d-flex flex-wrap mb-2">
                <strong>Email:</strong>
                
                <a href="#">
                    thomas@site.com
                </a>
            </p>

            <p className="d-flex flex-wrap mb-0">
                <strong>Phone:</strong>

                <a href="#">
                    (60) 12 345 6789
                </a>
            </p>
        </div>
    )
}