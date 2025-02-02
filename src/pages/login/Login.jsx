import { Link } from 'react-router-dom';

import { FormInput } from '../../components/inputs';
import { initialLoginState, DEMO_USER_1, DEMO_USER_2 } from './constants';
import { useForm } from '../../hooks/useForm';
import { useLogin } from './useLogin';

import styles from './login.module.css';

export const Login = ({ className = '' }) => {
    const { onLogin } = useLogin();
    const { values, error, changeHandler, handleSubmit } = useForm(initialLoginState);

    const onLoginHandler = (formData) => {
        onLogin(formData);
    };

    const onFirstDemoUserLogin = () => {
        onLogin(DEMO_USER_1);
    };

    const onSecondDemoUserLogin = () => {
        onLogin(DEMO_USER_2);
    };

    return (
        <div className={`${styles.formContainer} ${className}`}>
            <div className={styles.formContent}>
                <header>
                    <h3>Welcome back!</h3>
                    <p>Enter your credentials or click one of the demo users to login</p>
                </header>
                <form className={styles.form} onSubmit={handleSubmit(onLoginHandler)}>
                    <FormInput
                        type="text"
                        name="email"
                        id="email"
                        value={values.email}
                        onChange={changeHandler}
                        error={error.email}
                        placeholder="Enter email"
                    />
                    <FormInput
                        type="password"
                        name="password"
                        id="password"
                        value={values.password}
                        onChange={changeHandler}
                        error={error.password}
                        placeholder="Enter password"
                    />
                    <Link to="reset">Forgot password?</Link>
                    <FormInput
                        type="submit"
                        id="submit"
                        sx={{ marginBottom: '0.5em' }}
                        value="LOGIN"
                        disabled={!values.email || !values.password}
                    />

                    {/* Demo users login buttons(No need to enter email and password) */}
                    <FormInput
                        type="button"
                        id="demo1"
                        sx={{ marginBottom: '0.5em' }}
                        value="LOGIN AS DEMO USER 1"
                        onClick={onFirstDemoUserLogin}
                    />
                    <FormInput
                        type="button"
                        id="demo2"
                        sx={{ marginBottom: '0.5em' }}
                        value="LOGIN AS DEMO USER 2"
                        onClick={onSecondDemoUserLogin}
                    />
                </form>

                <span className={styles.signup}>
                    Don't have an account yet? <Link to="/register">Sign up</Link>
                </span>
            </div>
        </div>
    );
};
