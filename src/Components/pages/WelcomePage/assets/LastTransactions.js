import styles from "./LastTransactions.module.css"
import blocks from "../custom-block.module.css"
import { Link } from "react-router-dom"

export const LastTransactions = () => {
    const person1 = "https://notablepen.backendless.app/api/files/app/AppData/people/medium-shot-happy-man-smiling.jpg";
    const person2 = "https://notablepen.backendless.app/api/files/app/AppData/people/senior-man-white-sweater-eyeglasses.jpg";
    const person3 = "https://notablepen.backendless.app/api/files/app/AppData/people/young-beautiful-woman-pink-warm-sweater.jpg";
    
    return (
        <div className={`${blocks.customBlock} ${blocks.cusomBlockExchange}`}>
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
                    <strong style={{color:"darkred", marginRight: "0.25rem", display: "block"}}><span>-</span> 250лв</strong>
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
                    <strong style={{color:"green", marginRight: "0.25rem", display: "block"}} ><span>+</span > 280лв</strong>
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
                    <strong style={{color:"green",  marginRight: "0.25rem", display: "block"}} ><span>+</span > 280лв</strong>
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