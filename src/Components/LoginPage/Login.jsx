import { Link } from "react-router-dom";
import { useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import { useForm } from "../../hooks/useForm";
import "./login.css";

export const Login = () => {
    const { onLoginSubmitHandler, onRegisterSubmitHandler } =
        useContext(AuthContext);
    // const [checked, setChecked] = useState(false);
    const {
        values,
        changeHandler,
        onSubmitLogin,
        // resetFormHandler,
        // onSubmitRegister,
    } = useForm(
        {
            email: "",
            password: "",
            confirmPassword: "",
        },
        onLoginSubmitHandler,
        onRegisterSubmitHandler
    );

    // const onFormChange = (e) => {
    //     if (!checked) {
    //         setChecked(true);
    //         resetFormHandler(e);
    //     } else {
    //         setChecked(false);
    //         resetFormHandler(e);
    //     }
    // };

    return (
        <div className="container-authetication">
            <div className="login form">
                <form method="post" onSubmit={onSubmitLogin}>
                    <header>Вход в системата</header>
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
                        <Link to="/register">Регистрация</Link>
                    </span>
                </div>
            </div>
        </div>
    );
};
