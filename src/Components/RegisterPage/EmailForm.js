import { Link } from "react-router-dom";
import { useValidate } from "../../hooks/useValidate";
import "./register.css";

export const EmailForm = ({
    email,
    password,
    confirmPassword,
    changeHandler,
    currentStepsHandler,
}) => {
    const { error, errorHandler, clearErrorHandler } = useValidate(
        {
        email: "",
        password: "",
        confirmPassword: "",
        noFields: "",
    });

    const onNextPageHandler = (e) => {
        currentStepsHandler(e);
    };

    return (
        <section className="form-container">
            <div className="form-content">
                <header>
                    <h5>Е-майл и парола</h5>
                </header>
                <label htmlFor="email">
                    Е-майл <small className="star">* {error.email}</small>
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

                <label htmlFor="password">
                    Парола <small className="star">* {error.password}</small>
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

                <label htmlFor="confirmPassword">
                    Потвърди парола <small className="star">* {error.confirmPassword}</small>
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
