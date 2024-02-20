import { Link } from "react-router-dom";
import { useValidate } from "../../../../hooks/useValidate";
import styles from "../register.module.css";

export const EmailForm = ({
    email,
    password,
    confirmPassword,
    changeHandler,
    currentStepsHandler,
}) => {
    const { error, errorHandler, clearErrorHandler } = useValidate({
        email: "",
        password: "",
        confirmPassword: "",
        nodivs: "",
    });

    const onNextPageHandler = (e) => {
        if (!!email && !!password && confirmPassword === password) {
            currentStepsHandler(e);
        }
    };

    return (
        <section className="form-container">
            <div className="form-content">
                <header>
                    <h5>Е-майл и парола</h5>
                </header>
                <div className="form-group">
                    <label htmlFor="email">
                        Е-майл <small className="error">* {error.email}</small>
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="off"
                        placeholder="въведи е-майла"
                        className="form-control"
                        value={email}
                        onChange={changeHandler}
                        onBlur={errorHandler}
                        onFocus={clearErrorHandler}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">
                        Парола{" "}
                        <small className="error">* {error.password}</small>
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="off"
                        placeholder="въведи парола"
                        className="form-control"
                        value={password}
                        onChange={changeHandler}
                        onBlur={errorHandler}
                        onFocus={clearErrorHandler}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">
                        Потвърди парола{" "}
                        <small className="error">
                            * {error.confirmPassword}
                        </small>
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        autoComplete="off"
                        placeholder="потвърди парола"
                        className="form-control"
                        value={confirmPassword}
                        onChange={changeHandler}
                        onBlur={errorHandler}
                        onFocus={clearErrorHandler}
                    />
                </div>
                <footer>
                    <Link
                        type="button"
                        name="next"
                        className="button-primary"
                        style={{ width: `100%`, textAlign: `center` }}
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
                <span className="signup">
                    Вече имаш акаунт?
                    <Link to="/login">Влез в системата</Link>
                </span>
            </div>
        </section>
    );
};
