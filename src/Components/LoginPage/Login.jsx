import { Link } from "react-router-dom";
import { useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import { useForm } from "../../hooks/useForm";
import './login.css'

export const Login = () => {
    const { onLoginSubmitHandler, onRegisterSubmitHandler } = useContext(AuthContext);
    const [checked, setChecked] = useState(false);    
    const {values, changeHandler, onSubmitLogin, resetFormHandler, onSubmitRegister} = useForm({
        email: "",
        password: "",
        confirmPassword: "",
    }, onLoginSubmitHandler, onRegisterSubmitHandler);

    const onFormChange = (e) => {
        if (!checked) {
            setChecked(true);
            resetFormHandler(e);
        } else {
            setChecked(false);
            resetFormHandler(e);
        }
    };

    return (
        <div className="container-authetication">
            <input type="checkbox" id="check" />
            <div className="login form">
                <header>Вход в системата</header>
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
                    <input type="submit" className="button" value="Вход" />
                </form>
                <div className="signup">
                    <span className="signup">
                        Все още нямаш акаунт?
                        <label htmlFor="check" onClick={onFormChange}>
                            Регистрация
                        </label>
                    </span>
                </div>
            </div>

            <div className="registration form">
                <header>Signup</header>

                <form method="post" onSubmit={onSubmitRegister}>
                    <input
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={changeHandler}
                        autoComplete="off"
                        placeholder="Enter your email"
                        className="form-control"
                    />

                    <input
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={changeHandler}
                        autoComplete="off"
                        placeholder="Create a password"
                        className="form-control"
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onChange={changeHandler}
                        autoComplete="off"
                        placeholder="Confirm your password"
                        className="form-control"
                    />

                    <input
                        type="submit"
                        name="submit"
                        className="button btn btn-primary"
                        value="Signup"
                    />
                </form>

                <div className="signup">
                    <span className="signup">
                        Already have an account?
                        <label htmlFor="check" onClick={onFormChange}>
                            Login
                        </label>
                    </span>
                </div>
            </div>
        </div>
    );
};
