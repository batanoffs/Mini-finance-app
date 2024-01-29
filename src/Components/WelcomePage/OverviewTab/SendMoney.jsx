import person1 from "../../../images/profile/young-woman-with-round-glasses-yellow-sweater.jpg"
import person2 from "../../../images/profile/young-beautiful-woman-pink-warm-sweater.jpg"
import person3 from "../../../images/profile/senior-man-white-sweater-eyeglasses.jpg"

export const SendMoney = () => {
    return (
        <div className="custom-block primary-bg">
            <h5 className="text-white mb-4">Бързо изпращане</h5>

            <a href="#">
                <img src={person1} className="profile-image img-fluid" alt={"person"}/>
            </a>

            <a href="#">
                <img src={person2} className="profile-image img-fluid" alt={"person"}/>
            </a>

            <a href="#">
                <img src={person3} className="profile-image img-fluid" alt={"person"}/>
            </a>

            <div className="profile-rounded">
                <a href="#">
                    <i className="profile-rounded-icon bi-plus"></i>
                </a>
            </div>
        </div>
    )
}