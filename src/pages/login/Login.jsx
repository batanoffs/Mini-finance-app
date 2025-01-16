import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import { FormInput } from '../../components/inputs';
import { initialLoginState } from './constants';
import { useMessage } from '../../hooks/useMessage';
import { useForm } from '../../hooks/useForm';

import styles from './login.module.css';

export const Login = () => {
    const { onLoginSubmitHandler } = useContext(AuthContext);
    const { values, error, changeHandler, onSubmitLogin } = useForm(
        initialLoginState,
        onLoginSubmitHandler,
        null
    );
    const showMessage = useMessage();

    const onSubmitLoginHandler = async (event) => {
        const response = await onSubmitLogin(event);

        if (response?.message?.length > 0) {
            showMessage('error', response.message);
            return;
        } else {
            showMessage('success', 'Successfully logged in');
        }
    };

    return (
        <div className="form-container">
            <div className="form-content">
                <header>
                    <h5>Login</h5>
                </header>
                <form
                    style={{ display: `flex`, flexDirection: `column` }}
                    method="post"
                    onSubmit={onSubmitLoginHandler}
                >
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
                    <footer style={{ marginTop: '1em' }}>
                        <input
                            type="submit"
                            style={{ width: `100%`, textAlign: `center` }}
                            className="button-primary"
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
