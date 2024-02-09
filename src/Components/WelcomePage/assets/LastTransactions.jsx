import person3 from "../../../images/profile/senior-man-white-sweater-eyeglasses.jpg"
import person2 from "../../../images/profile/young-beautiful-woman-pink-warm-sweater.jpg"
import person1 from "../../../images/profile/young-woman-with-round-glasses-yellow-sweater.jpg"

import { Link } from "react-router-dom"

export const LastTransactions = () => {
    return (
        <div className="custom-block custom-block-transations">
            <h5 >Последни транзакции</h5>

            <div className="transactions-box-wrapper">
                <div className="transactions-profile-wrapper">
                    <img src={person3} className="profile-image " alt={"person"}/>

                    <div>
                        <p>
                            <a href="transation-detail.html">Daniel Jones</a>
                        </p>

                        <small className="text-muted">C2C Transfer</small>
                    </div>
                </div>

                <div className="transactions-amount-info">
                    <small>05/12/2023</small>
                    <strong className="d-block text-danger" style={{color: "red", display: "block"}}><span style={{marginRight: "0.25rem"}}>-</span> $250</strong>
                </div>
            </div>

            <div className="transactions-box-wrapper">
                <div className="transactions-profile-wrapper">
                    <img src={person2} className="profile-image " alt={"person"}/>

                    <div>
                        <p>
                            <a href="transation-detail.html">Public Bank</a>
                        </p>

                        <small className="text-muted">Mobile Reload</small>
                    </div>
                </div>

                <div className="transactions-amount-info">
                    <small>22/8/2023</small>
                    <strong style={{color:"green", marginRight: "0.25rem", display: "block"}} ><span>+</span > $280</strong>
                </div>
            </div>

            <div className="transactions-box-wrapper">
                <div className="transactions-profile-wrapper">
                    <img src={person1} className="profile-image " alt={"person"}/>

                    <div>
                        <p><a href="transation-detail.html">Store</a></p>

                        <small className="text-muted">Payment Received</small>
                    </div>
                </div>

                <div className="transactions-amount-info">
                    <small>22/8/2023</small>
                    <strong style={{color:"green",  marginRight: "0.25rem", display: "block"}} ><span>+</span > $280</strong>
                </div>
            </div>

            <div className="border-top pt-4 mt-4 text-center">
                <Link className="custom-btn" to="/dashboard/wallet">
                    Виж всички транзакции
                    <i className="bi-arrow-up-right-circle-fill ms-2"></i>
                </Link>
            </div>
        </div>
    )
}