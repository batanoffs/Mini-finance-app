import { Link } from 'react-router-dom';

import { FormInput } from '../../../../components/inputs'; 

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
            currentStepsHandler(e);
        }
    };

    return (
        <section className="form-container">
            <div className="form-content">
                <header>
                    <h5>Email and password</h5>
                </header>
                <FormInput
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    error={error.email}
                    onChange={changeHandler}
                    onBlur={validateHandler}
                    onFocus={onFocusHandler}
                    required
                />
                <FormInput
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter password"
                    error={error.password}
                    value={password}
                    onChange={changeHandler}
                    onBlur={validateHandler}
                    onFocus={onFocusHandler}
                    required
                />
                <FormInput
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm password"
                    error={error.confirmPassword}
                    value={confirmPassword}
                    onChange={changeHandler}
                    onBlur={validateHandler}
                    onFocus={onFocusHandler}
                    required
                />

                <footer>
                    <button
                        name="next"
                        className="button-primary"
                        style={{ width: `100%`, textAlign: `center` }}
                        onClick={onNextPageHandler}
                        disabled={!email || !password || confirmPassword !== password}
                    >
                        Next
                    </button>
                </footer>
                <span className="signup">
                    Already have an account? <Link to="/login">Sign in</Link>
                </span>
            </div>
        </section>
    );
};
