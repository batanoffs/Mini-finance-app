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
                    <h5>Имейл и парола</h5>
                </header>
                <div className="form-group">
                    <label htmlFor="email">
                        Имейл <small className="error">*</small>
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="off"
                        placeholder="въведи имейл"
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
                        Парола <small className="error">*</small>
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="off"
                        placeholder="въведи парола"
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
                        Потвърди парола <small className="error">*</small>
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        autoComplete="off"
                        placeholder="потвърди парола"
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
                        Напред
                    </Link>
                </footer>
                <span className="signup">
                    Вече имаш акаунт?
                    <Link to="/login">Влез в системата</Link>
                </span>
            </div>
        </section>
    )
}
