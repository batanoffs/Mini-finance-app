import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import { useForm } from "../../hooks/useForm";
import { Link, redirect } from "react-router-dom";
import "./register.css";

export const EmailForm = () => {
    const { onLoginSubmitHandler, onRegisterSubmitHandler } =
        useContext(AuthContext);
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
    return (
        <section className="form-container">
            <div className="form-content">
                <form action="#" method="post">
                    <header>
                        <h6>Е-майл и парола</h6>
                    </header>

                    <input
                        type="email"
                        name="email"
                        autoComplete="off"
                        placeholder="Въведи е-майла"
                        className="form-control"
                    />

                    <input
                        type="password"
                        name="password"
                        autoComplete="off"
                        placeholder="Въведи парола"
                        className="form-control"
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        autoComplete="off"
                        placeholder="Потвърди парола"
                        className="form-control"
                    />
                    <footer>
                        <Link
                            style={{ width: "100%", textAlign: "center" }}
                            type="button"
                            name="next"
                            className="button-primary"
                            to={"userinfo"}
                        >
                            Напред
                        </Link>
                    </footer>
                </form>
            </div>
        </section>
    );
};
