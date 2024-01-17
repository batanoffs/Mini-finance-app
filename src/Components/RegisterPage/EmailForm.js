// import { AuthContext } from "../../contexts/AuthContext";
// import { useContext } from "react";
import { Link } from "react-router-dom";
import "./register.css";

export const EmailForm = ({email, passowrd, changeHandler}) => {
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
                        value={email}
                        onChange={changeHandler}
                    />

                    <input
                        type="password"
                        name="password"
                        autoComplete="off"
                        placeholder="Въведи парола"
                        className="form-control"
                        value={passowrd}
                        onChange={changeHandler}
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
