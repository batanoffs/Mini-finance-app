import { Link } from "react-router-dom";
import { useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import { useForm } from "../../hooks/useForm";

export const LoginRegister = () => {
    const { onLoginSubmitHandler, onRegisterSubmitHandler } = useContext(AuthContext);
    const [checked, setChecked] = useState(false);    
    const {values, changeHandler, onSubmitLogin, resetFormHandler, onSubmitRegister} = useForm({
        email: "",
        password: "",
        confirmPassword: "",
    }, onLoginSubmitHandler, onRegisterSubmitHandler);
    //     const atIndex = values.username.indexOf("@");
    //     values.username = values.username.slice(0, atIndex);

    //     if (values.password !== values.confirmPassword) {
    //         return;
    //     }
    //     try {
    //         const response = await fetch(BASE_REGISTER_URL, {
    //             method: "POST",
    //             headers: {
    //                 "X-Parse-Application-Id":
    //                     "J7d9KFz7D1pyPmJe073ZsK5stStJP5aD4dW4Fxoy",
    //                 "X-Parse-REST-API-Key":
    //                     "iVHSXY38Vg77ClZ1ooPr7bS2CzXS4xKmoQqXcUs4",
    //                 "X-Parse-Revocable-Session": "1",
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(values),
    //         });
    //         const data = await response.json();
    //         const token = data.sessionToken;
    //         const userId = data.objectId;
    //         sessionStorage.setItem("userData", token);

    //         // TO DO: Fix redirect
    //         if(response.status !== 404) { 
    //             console.log(response.status);               
    //             redirect(`/dashboard/${userId}`);
    //         }
    //     } catch (error) {
    //         throw new Error(error);
    //     }
    //     setRecords([...records, values]);
    //     resetFormHandler(e);        
    // };

    
    // const onLoginSubmitHandler = async (e) => {
    //     e.preventDefault();
    //     const encodedUsername = encodeURI(formValues.username);
    //     const encodedPassword = encodeURI(formValues.password);
    //     const URI = BASE_LOGIN_URL + `?username=${encodedUsername}&password=${encodedPassword}`;

    //     try {
    //         const response = await fetch(URI, {
    //             method: "POST",
    //             headers: {
    //                 "X-Parse-Application-Id":
    //                     "J7d9KFz7D1pyPmJe073ZsK5stStJP5aD4dW4Fxoy",
    //                 "X-Parse-REST-API-Key":
    //                     "iVHSXY38Vg77ClZ1ooPr7bS2CzXS4xKmoQqXcUs4",
    //                 "X-Parse-Revocable-Session": "1",
    //             },
    //         });
    //         const data = await response.json();
    //         const token = data.sessionToken;
    //         const userId = data.objectId;
    //         sessionStorage.setItem("userData", token);
    //         // TO DO:
    //         // setRecords([...records, formValues]);
    //         setFormValues({
    //             username: "",
    //             email: "",
    //             password: "",
    //             confirmPassword: "",
    //         });
            
    //         // TO DO: Fix redirect
    //         if(response.status !== 404) {
    //             console.log(response.status);
    //             redirect(`/dashboard/${userId}`);
    //         }
    //     } catch (error) {
    //         throw new Error(error);
    //     }
        
    // };

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
                <header>Login</header>
                <form method="post" onSubmit={onSubmitLogin}>
                    <input
                        type="text"
                        autoComplete="off"
                        name="email"
                        value={values.email}
                        onChange={changeHandler}
                        placeholder="Enter your email"
                    />
                    <input
                        type="password"
                        autoComplete="off"
                        name="password"
                        value={values.password}
                        onChange={changeHandler}
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
