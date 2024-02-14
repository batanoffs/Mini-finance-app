import person1 from "../../../../images/profile/young-woman-with-round-glasses-yellow-sweater.jpg"
import person2 from "../../../../images/profile/young-beautiful-woman-pink-warm-sweater.jpg"
import person3 from "../../../../images/profile/senior-man-white-sweater-eyeglasses.jpg"
import blocks from "../custom-block.module.css"

export const SendMoney = () => {
    return (
        <div className={`${blocks.customBlock} ${blocks.primaryBg}`}>
            <h5 style={{ color: "var(--section-bg-color)"}}>Бързо изпращане</h5>

            <a href="#">
                <img src={person1} className={blocks.profileImage} alt={"person"}/>
            </a>

            <a href="#">
                <img src={person2} className={blocks.profileImage} alt={"person"}/>
            </a>

            <a href="#">
                <img src={person3} className={blocks.profileImage} alt={"person"}/>
            </a>

            <div className={blocks.profileRounded}>
                <a href="#">
                    <i className={blocks.profileRoundedIcon}></i>
                </a>
            </div>
        </div>
    )
}