import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { useContext } from "react";
import { useForm } from "../../../hooks/useForm";
import { useValidate } from "../../../hooks/useValidate";

export const Login = () => {
    const { onLoginSubmitHandler, loginError, setLoginError } =
        useContext(AuthContext);
    const { values, changeHandler, onSubmitLogin } = useForm(
        {
            email: "",
            password: "",
            confirmPassword: "",
        },
        onLoginSubmitHandler
    );

    const { error, errorHandler, clearErrorHandler } = useValidate({
        email: "",
        password: "",
    });

    const clearErrors = (e) => {
        clearErrorHandler(e);
        setLoginError(false);
    };

    return (
        <div className="form-container">
            <div className="form-content">
                <header>
                    <h5>Вход в системата</h5>
                </header>
                <form
                    style={{ display: `flex`, flexDirection: `column` }}
                    method="post"
                    onSubmit={onSubmitLogin}
                >
                    <div className="form-group">
                        <label htmlFor="email">
                        Имейл{" "}
                            <small className="error">* {error.email}</small>
                        </label>
                        <input
                            type="text"
                            autoComplete="on"
                            name="email"
                            placeholder="Въведи имейл"
                            value={values.email}
                            onChange={changeHandler}
                            onBlur={errorHandler}
                            onFocus={clearErrors}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">
                            Парола{" "}
                            <small className="error">* {error.password}</small>
                        </label>
                        <input
                            type="password"
                            autoComplete="on"
                            name="password"
                            placeholder="Въведи парола"
                            value={values.password}
                            onChange={changeHandler}
                            onBlur={errorHandler}
                            onFocus={clearErrors}
                        />
                    </div>
                    <Link to="reset">Забравена парола?</Link>
                    {loginError && (
                        <small style={{ color: "red" }}>
                            Грешен е-майл или парола
                        </small>
                    )}
                    <footer style={{ marginTop: "1em" }}>
                        <input
                            type="submit"
                            style={{ width: `100%`, textAlign: `center` }}
                            className="button-primary"
                            onSubmit={onSubmitLogin}
                            value="Вход"
                        />
                    </footer>
                </form>
                <span className="signup">
                    Все още нямаш акаунт?
                    <Link to="/register">Регистрация</Link>
                </span>
            </div>
        </div>
    );
};
