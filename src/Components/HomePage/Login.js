import { Link, redirect } from "react-router-dom";
import { useState, useEffect } from "react";

export const Login = () => {
    
    const [checked, setChecked] = useState(false);

    function change() {
        if(!checked) {
            setChecked(true);
        } else {
            setChecked(false);
        }
    }

    function onLogin(e) {
        e.preventDefault();
        redirect("/dashboard");
    }

    return (
        <div className="container">
            <input type="checkbox" id="check" />
            <div className="login form">
                <header>Login</header>
                <form action="submit" onSubmit={onLogin}>
                    <input type="text" placeholder="Enter your email" />
                    <input type="password" placeholder="Enter your password" />
                    <Link to="reset">Forgot password?</Link>
                    <input type="button" className="button" value="Login" />
                </form>
                <div className="signup">
                    <span className="signup">
                        Don't have an account?
                        <label htmlFor="check" onClick={change}>Signup</label>
                    </span>
                </div>
            </div>
            <div className="registration form">
                <header>Signup</header>
                <form action="#">
                    <input type="text" placeholder="Enter your email" />
                    <input type="password" placeholder="Create a password" />
                    <input
                        type="password"
                        placeholder="Confirm your password"
                    />
                    <input type="button" className="button" value="Signup" />
                </form>
                <div className="signup">
                    <span className="signup">
                        Already have an account?
                        <label htmlFor="check" onClick={change}>Login</label>
                    </span>
                </div>
            </div>
        </div>
    );
};
