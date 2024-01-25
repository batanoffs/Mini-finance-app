// import { AuthContext } from "../../contexts/AuthContext";
// import { useContext } from "react";
import { Link } from "react-router-dom";
import "./register.css";

export const EmailForm = ({
    email,
    password,
    confirmPassword,
    changeHandler,
    currentStepsHandler,
}) => {
    return (
        <section className="form-container">
            <div className="form-content">
                <header>
                    <h5>Е-майл и парола</h5>
                </header>
                <div>
                    <label htmlFor="email">
                        Email <small className="star">*</small>
                    </label>
                    <input
                        type="email"
                        name="email"
                        autoComplete="off"
                        placeholder="Въведи е-майла"
                        className="form-control"
                        value={email}
                        onChange={changeHandler}
                        id="email"
                    />

                    <label htmlFor="password">
                        Password <small className="star">*</small>
                    </label>
                    <input
                        type="password"
                        name="password"
                        autoComplete="off"
                        placeholder="Въведи парола"
                        className="form-control"
                        value={password}
                        onChange={changeHandler}
                        id="password"
                    />

                    <label htmlFor="confirmPassword">
                        Confirm Password <small className="star">*</small>
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        autoComplete="off"
                        placeholder="Потвърди парола"
                        className="form-control"
                        value={confirmPassword}
                        onChange={changeHandler}
                        id="confirmPassword"
                    />
                </div>
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
                        onClick={(e) => {
                            if (
                                confirmPassword === password &&
                                !!email &&
                                !!password
                            )
                                currentStepsHandler(e);
                        }}
                    >
                        Напред
                    </Link>
                </footer>
            </div>
        </section>
    );
};
