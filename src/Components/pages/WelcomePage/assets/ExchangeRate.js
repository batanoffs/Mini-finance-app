import USLogo from "../../../../images/flag/united-states.png";
import singaporeLogo  from "../../../../images/flag/singapore.png";
import UKLogo  from "../../../../images/flag/united-kingdom.png";
import australiaLogo  from "../../../../images/flag/australia.png";
import europeLogo  from "../../../../images/flag/european-union.png";
import styles from "./ExchangeRate.module.css";
import block from "../custom-block.module.css";

export const ExchangeRate = () => {
    return (
        <div className={block.cusomBlockExchange && block.customBlock}>
            <h5 >Обменен курс</h5>

            <div className={styles.exchangeWrapper}>
                <div className={styles.currencyWrapper}>
                    <img src={USLogo} className={styles.exchangeImage} alt={"US logo"}/>

                    <div>
                        <p className="currency">USD</p>
                        <h6>1 Щатски Долар</h6>
                    </div>
                </div>

                <div>
                    <small>Продава</small>
                    <h6>1.0931</h6>
                </div>

                <div>
                    <small>Купува</small>
                    <h6>1.0821</h6>
                </div>
            </div>

            <div className={styles.exchangeWrapper}>
                <div className={styles.currencyWrapper}>
                    <img src={singaporeLogo} className={styles.exchangeImage} alt={"Singapore logo"}/>

                    <div>
                        <p className="currency">SGD</p>
                        <h6>1 Сингапур Долар</h6>
                    </div>
                </div>

                <div>
                    <small>Продава</small>
                    <h6>0.6901</h6>
                </div>

                <div>
                    <small>Купува</small>
                    <h6>0.6201</h6>
                </div>
            </div>

            <div className={styles.exchangeWrapper}>
                <div className={styles.currencyWrapper}>
                    <img src={UKLogo} className={styles.exchangeImage} alt={"UK logo"}/>

                    <div>
                        <p className="currency">GPD</p>
                        <h6>1 Английски Паунд</h6>
                    </div>
                </div>

                <div>
                    <small>Продава</small>
                    <h6>1.1520</h6>
                </div>

                <div>
                    <small>Купува</small>
                    <h6>1.1412</h6>
                </div>
            </div>

            <div className={styles.exchangeWrapper}>
                <div className={styles.currencyWrapper}>
                    <img src={australiaLogo} className={styles.exchangeImage} alt={"australia logo"}/>

                    <div>
                        <p className="currency">AUD</p>
                        <h6>1 Австрийски Долар</h6>
                    </div>
                </div>

                <div>
                    <small>Продава</small>
                    <h6>0.6110</h6>
                </div>

                <div>
                    <small>Купува</small>
                    <h6>0.5110</h6>
                </div>
            </div>

            <div className={styles.exchangeWrapperLast}>
                <div className={styles.currencyWrapper}>
                    <img src={europeLogo} className={styles.exchangeImage} alt={"europe logo"}/>

                    <div>
                        <p className="currency">EUR</p>
                        <h6>1 Евро</h6>
                    </div>
                </div>

                <div>
                    <small>Продава</small>
                    <h6>1.1020</h6>
                </div>

                <div>
                    <small>Купува</small>
                    <h6>1.1010</h6>
                </div>
            </div>
        </div>
    )
}