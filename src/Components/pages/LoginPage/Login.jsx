import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { useContext } from "react";
import { useForm } from "../../../hooks/useForm";
import styles from "../RegisterPage/register.module.css";
import { App } from "antd";

export const Login = () => {
    const { message } = App.useApp();
    const { onLoginSubmitHandler } = useContext(AuthContext);
    const { values, error, validateHandler, onFocusHandler, changeHandler, onSubmitLogin } = useForm(
        {
            email: '',
            password: '',
        },
        onLoginSubmitHandler
    );

    const showMessage = (type, text) => {
        type === "error" ? message.error(text) :
        type === "success" ? message.success(text) :
        type === "warning" ? message.warning(text) :
        type === "info" ? message.info(text) :
        message(text);
    };

    const onLogin = async (event) => {
        const response = await onSubmitLogin(event);
        console.log("Login response: ", response);
        if (response) {
            showMessage("success", "Login successful");
        } else {
            showMessage("error", "Login failed");
        }
    }
    
    return (
        <div className="form-container">
            <div className="form-content">
                <header>
                    <h5>Вход в системата</h5>
                </header>
                <form
                    style={{ display: `flex`, flexDirection: `column` }}
                    method="post"
                    onSubmit={onLogin}
                >
                    <div className="form-group">
                        <label htmlFor="email">
                        Имейл{" "}
                        </label>
                        <input
                            type="text"
                            autoComplete="on"
                            name="email"
                            placeholder="Въведи имейл"
                            value={values.email}
                            onChange={changeHandler}
                            onBlur={validateHandler}
                            onFocus={onFocusHandler}
                        />
                    </div>
                    <small className={styles.error}> {error.email}</small>

                    <div className="form-group">
                        <label htmlFor="password">
                            Парола{" "}
                        </label>
                        <input
                            type="password"
                            autoComplete="on"
                            name="password"
                            placeholder="Въведи парола"
                            value={values.password}
                            onChange={changeHandler}
                            onBlur={validateHandler}
                            onFocus={onFocusHandler}
                        />
                    </div>
                    <small className={styles.error}> {error.password}</small>

                    <Link to="reset">Забравена парола?</Link>
                    <footer style={{ marginTop: "1em" }}>
                        <input
                            type="submit"
                            style={{ width: `100%`, textAlign: `center` }}
                            className="button-primary"
                            disabled={!values.email || !values.password}
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

