import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import { useForm } from "../../hooks/useForm";

export const Login = () => {
    const { onLoginSubmitHandler, onRegisterSubmitHandler } =
        useContext(AuthContext);
    const { values, changeHandler, onSubmitLogin } = useForm(
        {
            email: "",
            password: "",
            confirmPassword: "",
        },
        onLoginSubmitHandler,
        onRegisterSubmitHandler
    );

    return (
        <div className="form-container">
            <div className="form-content">
                <header>
                    <h6>Вход в системата</h6>
                </header>
                <form method="post" onSubmit={onSubmitLogin}>
                    <input
                        type="text"
                        autoComplete="on"
                        name="email"
                        value={values.email}
                        onChange={changeHandler}
                        placeholder="Въведи е-мейл"
                    />
                    <input
                        type="password"
                        autoComplete="on"
                        name="password"
                        value={values.password}
                        onChange={changeHandler}
                        placeholder="Въведи парола"
                    />
                    <Link to="reset">Забравена парола?</Link>
                    <footer>
                        <input
                            type="submit"
                            style={{ width: "10em" }}
                            className="button-primary"
                            onSubmit={onSubmitLogin}
                            value="Вход"
                        />
                    </footer>
                </form>

                <div className="signup">
                    <span className="signup">
                        Все още нямаш акаунт?
                        <Link to="/register">Регистрация</Link>
                    </span>
                </div>
            </div>
        </div>
    );
};
