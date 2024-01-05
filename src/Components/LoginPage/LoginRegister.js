import { Link, redirect } from "react-router-dom";
import { useState } from "react";

const BASE_REGISTER_URL = "https://parseapi.back4app.com/users";
const BASE_LOGIN_URL = "https://parseapi.back4app.com/login";

export const LoginRegister = () => {
    const [checked, setChecked] = useState(false);
    const [records, setRecords] = useState([]);
    const [formValues, setFormValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        if (e.target.type === "email") {
            formValues.username = e.target.value;
        }
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const onRegisterSubmitHandler = async (e) => {
        e.preventDefault();
        const atIndex = formValues.username.indexOf("@");
        formValues.username = formValues.username.slice(0, atIndex);

        if (formValues.password !== formValues.confirmPassword) {
            return;
        }
        try {
            const response = await fetch(BASE_REGISTER_URL, {
                method: "POST",
                headers: {
                    "X-Parse-Application-Id":
                        "J7d9KFz7D1pyPmJe073ZsK5stStJP5aD4dW4Fxoy",
                    "X-Parse-REST-API-Key":
                        "iVHSXY38Vg77ClZ1ooPr7bS2CzXS4xKmoQqXcUs4",
                    "X-Parse-Revocable-Session": "1",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formValues),
            });
            const data = await response.json();
            const token = data.sessionToken;
            const userId = data.objectId;
            sessionStorage.setItem("userData", token);

            // TO DO:
            if(response.status !== 404) { 
                console.log(response.status);               
                redirect(`/dashboard/${userId}`);
            }
        } catch (error) {
            throw new Error(error);
        }
        setRecords([...records, formValues]);
        setFormValues({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        });

        
    };

    
    const onLoginSubmitHandler = async (e) => {
        e.preventDefault();
        const encodedUsername = encodeURI(formValues.username);
        const encodedPassword = encodeURI(formValues.password);
        const URI = BASE_LOGIN_URL + `?username=${encodedUsername}&password=${encodedPassword}`;

        try {
            const response = await fetch(URI, {
                method: "POST",
                headers: {
                    "X-Parse-Application-Id":
                        "J7d9KFz7D1pyPmJe073ZsK5stStJP5aD4dW4Fxoy",
                    "X-Parse-REST-API-Key":
                        "iVHSXY38Vg77ClZ1ooPr7bS2CzXS4xKmoQqXcUs4",
                    "X-Parse-Revocable-Session": "1",
                },
            });
            const data = await response.json();
            const token = data.sessionToken;
            const userId = data.objectId;
            sessionStorage.setItem("userData", token);
            // TO DO:
            // setRecords([...records, formValues]);
            setFormValues({
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
            });
            
            if(response.status !== 404) {
                console.log(response.status);
                redirect(`/dashboard/${userId}`);
            }
        } catch (error) {
            throw new Error(error);
        }
        
    };

    const onFormChange = (e) => {
        if (!checked) {
            setChecked(true);
            setFormValues({
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
            });
        } else {
            setChecked(false);
            setFormValues({
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
            });
        }
    };

    return (
        <div className="container-authetication">
            <input type="checkbox" id="check" />
            <div className="login form">
                <header>Login</header>
                <form action="submit" onSubmit={onLoginSubmitHandler}>
                    <input
                        type="text"
                        autoComplete="off"
                        name="username"
                        value={formValues.username}
                        onChange={inputChangeHandler}
                        placeholder="Enter your username"
                    />
                    <input
                        type="password"
                        autoComplete="off"
                        name="password"
                        value={formValues.password}
                        onChange={inputChangeHandler}
                        placeholder="Enter your password"
                    />
                    <Link to="reset">Forgot password?</Link>
                    <input type="submit" className="button" value="Login" />
                </form>
                <div className="signup">
                    <span className="signup">
                        Don't have an account?
                        <label htmlFor="check" onClick={onFormChange}>
                            Signup
                        </label>
                    </span>
                </div>
            </div>

            <div className="registration form">
                <header>Signup</header>

                <form onSubmit={onRegisterSubmitHandler}>
                    <input
                        type="email"
                        name="email"
                        value={formValues.email}
                        onChange={inputChangeHandler}
                        autoComplete="off"
                        placeholder="Enter your email"
                        className="form-control"
                    />

                    <input
                        type="password"
                        name="password"
                        value={formValues.password}
                        onChange={inputChangeHandler}
                        autoComplete="off"
                        placeholder="Create a password"
                        className="form-control"
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        value={formValues.confirmPassword}
                        onChange={inputChangeHandler}
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
