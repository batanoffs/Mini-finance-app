// import { AuthContext } from "../../contexts/AuthContext";
// import { useContext } from "react";
import { Link } from "react-router-dom";
import "./register.css";

export const EmailForm = ({
    email,
    password,
    confirmPassword,
    changeHandler,
    currentStepsHendler
}) => {
   
    return (
        <section className="form-container">
            <div className="form-content">
                <form action="#" method="post">
                    <header>
                        <h6>Е-майл и парола</h6>
                    </header>

                    <label htmlFor="email"><p className="star">*</p>Email:</label>
                    <input
                        type="email"
                        name="email"
                        autoComplete="off"
                        placeholder="Въведи е-майла"
                        className="form-control"
                        value={email}
                        onChange={changeHandler}
                        id="email"
                    />

                    <label htmlFor="password"><p className="star">*</p>Password:</label>
                    <input
                        type="password"
                        name="password"
                        autoComplete="off"
                        placeholder="Въведи парола"
                        className="form-control"
                        value={password}
                        onChange={changeHandler}
                        id="password"
                    />

                    <label htmlFor="confirmPassword"><p className="star">*</p>Confirm Password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        autoComplete="off"
                        placeholder="Потвърди парола"
                        className="form-control"
                        value={confirmPassword}
                        onChange={changeHandler}
                        id="confirmPassword"
                    />
                    <footer>
                        <Link
                            type="button"
                            name="next"
                            className="button-primary"
                            to={'userInfo'}
                            onClick={currentStepsHendler}
                        >
                            Напред
                        </Link>
                    </footer>
                </form>
            </div>
        </section>
    );
};
