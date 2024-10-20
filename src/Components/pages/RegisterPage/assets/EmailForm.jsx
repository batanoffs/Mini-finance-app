import { Link } from 'react-router-dom'

import styles from '../register.module.css'

export const EmailForm = ({
    email,
    password,
    confirmPassword,
    error,
    changeHandler,
    currentStepsHandler,
    validateHandler,
    onFocusHandler,
}) => {
    const onNextPageHandler = (e) => {
        if (!!email && !!password && confirmPassword === password) {
            currentStepsHandler(e)
        }
    }

    const navigateTo = !!email && !!password && confirmPassword === password ? 'userInfo' : null

    return (
        <section className="form-container">
            <div className="form-content">
                <header>
                    <h5>Email and password</h5>
                </header>
                <div className="form-group">
                    <label htmlFor="email">
                        Email <small className="error">*</small>
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="off"
                        placeholder="Enter email"
                        className="form-control"
                        value={email}
                        onChange={changeHandler}
                        onBlur={validateHandler}
                        onFocus={onFocusHandler}
                    />
                </div>
                <small className={styles.error}> {error.email}</small>

                <div className="form-group">
                    <label htmlFor="password">
                        Password <small className="error">*</small>
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="off"
                        placeholder="Enter password"
                        className="form-control"
                        value={password}
                        onChange={changeHandler}
                        onBlur={validateHandler}
                        onFocus={onFocusHandler}
                    />
                </div>
                <small className={styles.error}>{error.password}</small>

                <div className="form-group">
                    <label htmlFor="confirmPassword">
                        Confirm password <small className="error">*</small>
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        autoComplete="off"
                        placeholder="Confirm password"
                        className="form-control"
                        value={confirmPassword}
                        onChange={changeHandler}
                        onBlur={validateHandler}
                        onFocus={onFocusHandler}
                    />
                </div>
                <small className={styles.error}>{error.confirmPassword}</small>

                <footer>
                    <Link
                        type="button"
                        name="next"
                        className="button-primary"
                        style={{ width: `100%`, textAlign: `center` }}
                        to={navigateTo}
                        onClick={onNextPageHandler}
                        disabled={!email || !password || confirmPassword !== password}
                    >
                        Next
                    </Link>
                </footer>
                <span className="signup">
                    Already have an account?
                    <Link to="/login">Sign in</Link>
                </span>
            </div>
        </section>
    )
}


