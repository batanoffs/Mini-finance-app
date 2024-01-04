import { Link, redirect } from "react-router-dom";
import { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

export const LoginRegister = () => {
    const [state, setState] = useState({
        number: "",
        name: "",
        expiry: "",
        cvc: "",
        name: "",
        focus: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState((prev) => ({ ...prev, [name]: value }));
    };
    const handleInputFocus = (e) => {
        setState((prev) => ({ ...prev, focus: e.target.name }));
    };

    const [checked, setChecked] = useState(false);

    function change() {
        if (!checked) {
            setChecked(true);
        } else {
            setChecked(false);
        }
    }

    function onLogin(e) {
        e.preventDefault();
        redirect("/dashboard");
    }

    function onSubmitHandler(e) {
        e.preventDefault();
        console.log("submitted");
    }

    return (
        <div className="container-authetication">
            <input type="checkbox" id="check" />
            <div className="login form">
                <header>Login</header>
                <form  action="submit" onSubmit={onLogin}>
                    <input type="text" autoComplete="off" name="email" placeholder="Enter your email" />
                    <input type="password" autoComplete="off" name="password" placeholder="Enter your password" />
                    <Link to="reset">Forgot password?</Link>
                    <input type="button" className="button" value="Login" />
                </form>
                <div className="signup">
                    <span className="signup">
                        Don't have an account?
                        <label htmlFor="check" onClick={change}>
                            Signup
                        </label>
                    </span>
                </div>
            </div>

            <div className="registration form">
                <header>Signup</header>

                <form >
                    <input
                        type="email"
                        name="email"
                        autoComplete="off"
                        placeholder="Enter your email"
                        className="form-control mb-3"
                    />
                    <input
                        type="password"
                        name="password"
                        autoComplete="off"
                        placeholder="Create a password"
                        className="form-control mb-3"
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        autoComplete="off"
                        placeholder="Confirm your password"
                        className="form-control mb-3"
                    />

                    <div className="row width 25%">
                        <div className="col-md-6">
                            <input
                                type="number"
                                name="number"
                                className="form-control"
                                placeholder="Card Number"
                                value={state.number}
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
                                required
                            />

                            <input
                                type="text"
                                name="name"
                                autoComplete="off"
                                className="form-control mt-3"
                                placeholder="Name"
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
                                required
                            />

                            <input
                                type="number"
                                name="expiry"
                                className="form-control mt-3"
                                placeholder="Valid Thru"
                                pattern="\d\d/\d\d"
                                value={state.expiry}
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
                                required
                            />

                            <input
                                type="number"
                                name="cvc"
                                className="form-control mt-3 p-3"
                                placeholder="CVC"
                                pattern="\d{3,4}"
                                value={state.cvc}
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
                                required
                            />
                        </div>

                        <div className="col-md-2 mt-2 mt-md-1">
                            <div className="text-right">
                                <Cards
                                    number={state.number}
                                    expiry={state.expiry}
                                    cvc={state.cvc}
                                    name={state.name}
                                    focused={state.focus}
                                />
                            </div>
                        </div>
                    </div>
                </form>

                <input
                    type="button"
                    name="submit"
                    onClick={onSubmitHandler}
                    className="button btn btn-primary"
                    value="Signup"
                />

                <div className="signup mt-3">
                    <span className="signup">
                        Already have an account?
                        <label htmlFor="check" onClick={change}>
                            Login
                        </label>
                    </span>
                </div>
            </div>
        </div>
    );
};
