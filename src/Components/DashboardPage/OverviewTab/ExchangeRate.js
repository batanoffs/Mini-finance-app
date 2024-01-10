import  USLogo from "../../../images/flag/united-states.png";
import  singaporeLogo  from "../../../images/flag/singapore.png";
import  UKLogo  from "../../../images/flag/united-kingdom.png";
import  australiaLogo  from "../../../images/flag/australia.png";
import  europeLogo  from "../../../images/flag/european-union.png";


export const ExchangeRate = () => {
    return (
        <div className="custom-block custom-block-exchange">
            <h5 className="mb-4">Обменен курс</h5>

            <div className="d-flex align-items-center border-bottom pb-3 mb-3">
                <div className="d-flex align-items-center">
                    <img src={USLogo} className="exchange-image img-fluid" alt={"US logo"}/>

                    <div>
                        <p>USD</p>
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

            <div className="d-flex align-items-center border-bottom pb-3 mb-3">
                <div className="d-flex align-items-center">
                    <img src={singaporeLogo} className="exchange-image img-fluid" alt={"Singapore logo"}/>

                    <div>
                        <p>SGD</p>
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

            <div className="d-flex align-items-center border-bottom pb-3 mb-3">
                <div className="d-flex align-items-center">
                    <img src={UKLogo} className="exchange-image img-fluid" alt={"UK logo"}/>

                    <div>
                        <p>GPD</p>
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

            <div className="d-flex align-items-center border-bottom pb-3 mb-3">
                <div className="d-flex align-items-center">
                    <img src={australiaLogo} className="exchange-image img-fluid" alt={"australia logo"}/>

                    <div>
                        <p>AUD</p>
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

            <div className="d-flex align-items-center">
                <div className="d-flex align-items-center">
                    <img src={europeLogo} className="exchange-image img-fluid" alt={"europe logo"}/>

                    <div>
                        <p>EUR</p>
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