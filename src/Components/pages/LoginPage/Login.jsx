import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { useContext } from "react";
import { useForm } from "../../../hooks/useForm";
import styles from "../RegisterPage/register.module.css";
import { useMessage } from "../../../hooks/useMessage";

export const Login = () => {
    const showMessage = useMessage();
    const { onLoginSubmitHandler } = useContext(AuthContext);
    const { values, error, changeHandler, onSubmitLogin } = useForm(
        {
            email: '',
            password: '',
        },
        onLoginSubmitHandler
    );

    const onSubmitLoginHandler = async (event) => {
        const response = await onSubmitLogin(event);
        if (!response) {
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
                    onSubmit={onSubmitLoginHandler}
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

