import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../../contexts/AuthContext'
import { useMessage } from '../../../hooks/useMessage'
import { useForm } from '../../../hooks/useForm'

import styles from '../RegisterPage/register.module.css'

export const Login = () => {
    const showMessage = useMessage()
    const { onLoginSubmitHandler } = useContext(AuthContext)
    const { values, error, changeHandler, onSubmitLogin } = useForm(
        {
            email: '',
            password: '',
        },
        onLoginSubmitHandler,
        null
    )

    const onSubmitLoginHandler = async (event) => {
        const response = await onSubmitLogin(event)
        if (!response) {
            showMessage('error', 'Invalid email or password')
        }
    }

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
                    <div className="form-group">
                        <label htmlFor="email">Email </label>
                        <input
                            type="text"
                            autoComplete="on"
                            name="email"
                            placeholder="Enter email"
                            value={values.email}
                            onChange={changeHandler}
                        />
                    </div>
                    <small className={styles.error}> {error.email}</small>

                    <div className="form-group">
                        <label htmlFor="password">Password </label>
                        <input
                            type="password"
                            autoComplete="on"
                            name="password"
                            placeholder="Enter password"
                            value={values.password}
                            onChange={changeHandler}
                        />
                    </div>
                    <small className={styles.error}> {error.password}</small>

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
                <span className="signup">
                    Don't have an account yet?
                    <Link to="/register">Sign up</Link>
                </span>
            </div>
        </div>
    )
}
