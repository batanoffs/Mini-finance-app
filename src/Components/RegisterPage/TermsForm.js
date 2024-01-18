import { Link } from "react-router-dom";
import { useState } from "react";

export const TermsForm = ({currentStepsHendler}) => {
    const [check, setCheck] = useState(false)
    return (
        <div className="form-container">
            <div className="form-content">
                <header>
                    <h6>Правила и условия</h6>
                </header>

                <form action="#" method="post">
                    <div style={{display: "inline-flex", flexDirection: "row"}}>
                        <label htmlFor="accept">
                            Съгласен съм с условията
                        </label>

                        <input
                            type="checkbox"
                            name="accept"
                            autoComplete="off"
                            value= {check}
                            onChange={() => setCheck(!check)}
                            className="form-control"
                            style={{width: "15px", height: "15px"}}
                        />
                    </div>
                </form>
                <footer>
                    <Link
                        
                        type="button"
                        name="prev"
                        className="button-secondary"
                        to={"/register/creditcard"}
                        onClick={currentStepsHendler}
                    >
                        Назад
                    </Link>
                    <Link
                        type="button"
                        name="next"
                        className="button-primary"
                        to={"/register/confirm"}
                        onClick={currentStepsHendler}
                    >
                        Напред
                    </Link>
                </footer>
            </div>
        </div>
    );
};
