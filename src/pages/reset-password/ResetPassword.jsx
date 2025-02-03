import { FormInput } from '../../components/inputs';
import { useResetPass } from './useResetPass';

import styles from './resetPassword.module.css';

export const ResetPassword = () => {
    const {
        isLoading,
        values,
        error,
        onSubmit,
        changeHandler,
        validateHandler,
        onFocusHandler,
        handleSubmit,
    } = useResetPass();

    return (
        <div className={styles.formContainer}>
            <div className={styles.formContent}>
                <header>
                    <h5>Reset Password</h5>
                </header>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <FormInput
                        type="email"
                        name="email"
                        id="email"
                        value={values.email}
                        onChange={changeHandler}
                        onBlur={validateHandler}
                        onFocus={onFocusHandler}
                        placeholder="Enter your email"
                        error={error.email}
                        disabled={isLoading}
                        required
                    />
                    <footer className={styles.footer}>
                        <FormInput
                            type="submit"
                            value={isLoading ? 'Sending...' : 'Send Reset Link'}
                            disabled={isLoading || Object.keys(error).length > 0}
                        />
                    </footer>
                </form>
            </div>
        </div>
    );
};
