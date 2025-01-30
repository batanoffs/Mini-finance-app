import { Link } from 'react-router-dom';

import { FormInput } from '../../components/inputs';
import { initialLoginState } from './constants';
import { useForm } from '../../hooks/useForm';
import { useLogin } from './useLogin';

import styles from './login.module.css';

export const Login = () => {
    const { login, onDemoLogin } = useLogin();
    const { values, error, changeHandler, handleSubmit } = useForm(initialLoginState);

    const onSubmit = (formData) => {
        login(formData);
    };

    const demoUserLoginHandler = () => {
        onDemoLogin();
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.formContent}>
                <header>
                    <h3>Welcome back!</h3>
                </header>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
                    {/* TODO add demo user login button */}
                    <FormInput
                        type="button"
                        id="demo"
                        value="LOGIN AS DEMO USER"
                        onClick={demoUserLoginHandler}
                    />
                </form>

                <span className={styles.signup}>
                    Don't have an account yet? <Link to="/register">Sign up</Link>
                </span>
            </div>
        </div>
    );
};
