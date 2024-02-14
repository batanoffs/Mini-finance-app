import person3 from "../../../../images/profile/senior-man-white-sweater-eyeglasses.jpg"
import person2 from "../../../../images/profile/young-beautiful-woman-pink-warm-sweater.jpg"
import person1 from "../../../../images/profile/young-woman-with-round-glasses-yellow-sweater.jpg"
import styles from "./LastTransactions.module.css"
import blocks from "../custom-block.module.css"
import { Link } from "react-router-dom"

export const LastTransactions = () => {
    return (
        <div className={`${blocks.customBlock} ${blocks.customBlockTransactions}`}>
            <h5 >Последни транзакции</h5>

            <div className={styles.transactionsBoxWrapper}>
                <div className={styles.transactionsProfileWrapper}>
                    <img src={person3} className={blocks.profileImage} alt={"person"}/>

                    <div>
                        <p>
                            <strong>Daniel Jones</strong>
                        </p>

                        <small >C2C Transfer</small>
                    </div>
                </div>

                <div className={styles.transactionsAmountInfo}>
                    <small>05/12/2023</small>
                    <strong className="d-block error" style={{color: "red", display: "block"}}><span style={{marginRight: "0.25rem"}}>-</span> $250</strong>
                </div>
            </div>

            <div className={styles.transactionsBoxWrapper}>
                <div className={styles.transactionsProfileWrapper}>
                    <img src={person2} className={blocks.profileImage} alt={"person"}/>

                    <div>
                        <p>
                            <strong>Public Bank</strong>
                        </p>

                        <small >Mobile Reload</small>
                    </div>
                </div>

                <div className={styles.transactionsAmountInfo}>
                    <small>22/8/2023</small>
                    <strong style={{color:"green", marginRight: "0.25rem", display: "block"}} ><span>+</span > $280</strong>
                </div>
            </div>

            <div className={styles.transactionsBoxWrapper}>
                <div className={styles.transactionsProfileWrapper}>
                    <img src={person1} className={blocks.profileImage} alt={"person"}/>

                    <div>
                        <p><strong>Store</strong></p>

                        <small >Payment Received</small>
                    </div>
                </div>

                <div className={styles.transactionsAmountInfo}>
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