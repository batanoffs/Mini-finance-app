import { useState } from 'react';

import { useMessage } from '../../hooks/useMessage';
import { authService } from '../../services';
import { FormInput } from '../../components/inputs';

import styles from './resetPassword.module.css';

export const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const showMessage = useMessage();

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            await authService.resetPassword(email);
            showMessage('success', 'Password reset email sent successfully.');
            setEmail('');
        } catch (error) {
            showMessage('error', error.message);
        }
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.formContent}>
                <header>
                    <h5>Reset Password</h5>
                </header>
                <form className={styles.form} onSubmit={onSubmitHandler}>
                    <FormInput
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                    <footer className={styles.footer}>
                        <input
                            type="submit"
                            className={styles.buttonPrimary}
                            value="Send Reset Link"
                        />
                    </footer>
                </form>
            </div>
        </div>
    );
};
