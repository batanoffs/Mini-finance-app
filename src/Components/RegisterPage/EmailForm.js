// import { AuthContext } from "../../contexts/AuthContext";
// import { useContext } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./register.css";

export const EmailForm = ({
    email,
    password,
    confirmPassword,
    changeHandler,
    currentStepsHandler,
}) => {
    const [error, setError] = useState("");
    const onNextPageHandler = (e) => {
        if (confirmPassword === password && !!email && !!password) {
            currentStepsHandler(e);
            setError("");
        } else if (email && confirmPassword !== password) {
            setError("Вашата парола не съвпада");
        } else {
            setError("Въведете задължителните полета");
        }
    };
    return (
        <section className="form-container">
            <div className="form-content">
                <header>
                    <h5>Е-майл и парола</h5>
                </header>
                    <label htmlFor="email">
                        Е-майл <small className="star">*</small>
                    </label>
                    <input
                        type="email"
                        name="email"
                        onFocus={() => setError("")}
                        autoComplete="off"
                        placeholder="Въведи е-майла"
                        className="form-control"
                        value={email}
                        onChange={changeHandler}
                        id="email"
                    />

                    <label htmlFor="password">
                        Парола <small className="star">*</small>
                    </label>
                    <input
                        type="password"
                        name="password"
                        onFocus={() => setError("")}
                        autoComplete="off"
                        placeholder="Въведи парола"
                        className="form-control"
                        value={password}
                        onChange={changeHandler}
                        id="password"
                    />

                    <label htmlFor="confirmPassword">
                        Потвърди парола <small className="star">*</small>
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        autoComplete="off"
                        onFocus={() => setError("")}
                        placeholder="Потвърди парола"
                        className="form-control"
                        value={confirmPassword}
                        onChange={changeHandler}
                        id="confirmPassword"
                    />
                    <p className="text-danger">{error}</p>
                <footer>
                    <Link
                        type="button"
                        name="next"
                        className="button-primary"
                        to={
                            !!email &&
                            !!password &&
                            confirmPassword === password
                                ? "userInfo"
                                : null
                        }
                        onClick={onNextPageHandler}
                    >
                        Напред
                    </Link>
                </footer>
            </div>
        </section>
    );
};
