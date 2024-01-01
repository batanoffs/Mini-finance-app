import person3 from "../../images/profile/senior-man-white-sweater-eyeglasses.jpg"
import person2 from "../../images/profile/young-beautiful-woman-pink-warm-sweater.jpg"
import person1 from "../../images/profile/young-woman-with-round-glasses-yellow-sweater.jpg"

import { Link } from "react-router-dom"

export const Transactions = () => {
    return (
        <div className="custom-block custom-block-transations">
            <h5 className="mb-4">Recent Transactions</h5>

            <div className="d-flex flex-wrap align-items-center mb-4">
                <div className="d-flex align-items-center">
                    <img src={person3} className="profile-image img-fluid" alt={"person"}/>

                    <div>
                        <p>
                            <a href="transation-detail.html">Daniel Jones</a>
                        </p>

                        <small className="text-muted">C2C Transfer</small>
                    </div>
                </div>

                <div className="ms-auto">
                    <small>05/12/2023</small>
                    <strong className="d-block text-danger"><span className="me-1">-</span> $250</strong>
                </div>
            </div>

            <div className="d-flex flex-wrap align-items-center mb-4">
                <div className="d-flex align-items-center">
                    <img src={person2} className="profile-image img-fluid" alt={"person"}/>

                    <div>
                        <p>
                            <a href="transation-detail.html">Public Bank</a>
                        </p>

                        <small className="text-muted">Mobile Reload</small>
                    </div>
                </div>

                <div className="ms-auto">
                    <small>22/8/2023</small>
                    <strong className="d-block text-success"><span className="me-1">+</span> $280</strong>
                </div>
            </div>

            <div className="d-flex flex-wrap align-items-center">
                <div className="d-flex align-items-center">
                    <img src={person1} className="profile-image img-fluid" alt={"person"}/>

                    <div>
                        <p><a href="transation-detail.html">Store</a></p>

                        <small className="text-muted">Payment Received</small>
                    </div>
                </div>

                <div className="ms-auto">
                    <small>22/8/2023</small>
                    <strong className="d-block text-success"><span className="me-1">+</span> $280</strong>
                </div>
            </div>

            <div className="border-top pt-4 mt-4 text-center">
                <Link className="btn custom-btn" to="/wallet">
                    View all transations
                    <i className="bi-arrow-up-right-circle-fill ms-2"></i>
                </Link>
            </div>
        </div>
    )
}