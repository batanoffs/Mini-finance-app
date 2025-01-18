import { Link } from 'react-router-dom';

import { FormInput } from '../../components/inputs';
import { initialLoginState } from './constants';
import { useForm } from '../../hooks/useForm';
import { useLogin } from './useLogin';

import styles from './login.module.css';

export const Login = () => {
    const { login } = useLogin();
    const { values, error, changeHandler, handleSubmit } = useForm(initialLoginState);

    const onSubmit = (data) => {
        login(data);
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.formContent}>
                <header>
                    <h5>Login</h5>
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
                    <footer className={styles.footer}>
                        <input
                            type="submit"
                            className={styles.buttonPrimary}
                            disabled={!values.email || !values.password}
                            value="Login"
                        />
                    </footer>
                </form>

                <span className={styles.signup}>
                    Don't have an account yet? <Link to="/register">Sign up</Link>
                </span>
            </div>
        </div>
    );
};
