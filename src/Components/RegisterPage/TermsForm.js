import { Link } from "react-router-dom";
export const TermsForm = () => {
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
                            className="form-control"
                            style={{width: "15px", height: "15px"}}
                        />
                    </div>
                </form>
                <footer>
                    <Link
                        style={{ width: "10em", textAlign: "center", marginRight: "1em" }}
                        type="button"
                        name="next"
                        className="button-secondary"
                        to={"/register/creditcard"}
                    >
                        Назад
                    </Link>
                    <Link
                        style={{ width: "10em", textAlign: "center" }}
                        type="button"
                        name="next"
                        className="button-primary"
                        to={"/register/confirm"}
                    >
                        Напред
                    </Link>
                </footer>
            </div>
        </div>
    );
};
