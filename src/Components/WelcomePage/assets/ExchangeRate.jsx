import  USLogo from "../../../images/flag/united-states.png";
import  singaporeLogo  from "../../../images/flag/singapore.png";
import  UKLogo  from "../../../images/flag/united-kingdom.png";
import  australiaLogo  from "../../../images/flag/australia.png";
import  europeLogo  from "../../../images/flag/european-union.png";
import styles from "./exchangerate.module.css";

export const ExchangeRate = () => {
    return (
        <div className="custom-block custom-block-exchange">
            <h5 className="mb-4">Обменен курс</h5>

            <div className="exchange-block-wrapper">
                <div className="currency-wrapper">
                    <img src={USLogo} className="exchange-image " alt={"US logo"}/>

                    <div>
                        <p className={styles.currency}>USD</p>
                        <h6>1 Щатски Долар</h6>
                    </div>
                </div>

                <div className="ms-auto me-4">
                    <small>Продава</small>
                    <h6>1.0931</h6>
                </div>

                <div>
                    <small>Купува</small>
                    <h6>1.0821</h6>
                </div>
            </div>

            <div className="exchange-block-wrapper">
                <div className="currency-wrapper">
                    <img src={singaporeLogo} className="exchange-image " alt={"Singapore logo"}/>

                    <div>
                        <p className={styles.currency}>SGD</p>
                        <h6>1 Сингапур Долар</h6>
                    </div>
                </div>

                <div className="ms-auto me-4">
                    <small>Продава</small>
                    <h6>0.6901</h6>
                </div>

                <div>
                    <small>Купува</small>
                    <h6>0.6201</h6>
                </div>
            </div>

            <div className="exchange-block-wrapper">
                <div className="currency-wrapper">
                    <img src={UKLogo} className="exchange-image " alt={"UK logo"}/>

                    <div>
                        <p className={styles.currency}>GPD</p>
                        <h6>1 Английски Паунд</h6>
                    </div>
                </div>

                <div className="ms-auto me-4">
                    <small>Продава</small>
                    <h6>1.1520</h6>
                </div>

                <div>
                    <small>Купува</small>
                    <h6>1.1412</h6>
                </div>
            </div>

            <div className="exchange-block-wrapper">
                <div className="currency-wrapper">
                    <img src={australiaLogo} className="exchange-image " alt={"australia logo"}/>

                    <div>
                        <p className={styles.currency}>AUD</p>
                        <h6>1 Австрийски Долар</h6>
                    </div>
                </div>

                <div className="ms-auto me-4">
                    <small>Продава</small>
                    <h6>0.6110</h6>
                </div>

                <div>
                    <small>Купува</small>
                    <h6>0.5110</h6>
                </div>
            </div>

            <div className="exchange-block-wrapper-last">
                <div className="currency-wrapper">
                    <img src={europeLogo} className="exchange-image " alt={"europe logo"}/>

                    <div>
                        <p className={styles.currency}>EUR</p>
                        <h6>1 Евро</h6>
                    </div>
                </div>

                <div className="ms-auto me-4">
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