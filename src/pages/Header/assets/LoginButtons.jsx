import { Link } from 'react-router-dom'
import styles from '../site-header.module.css'

export const LoginButtons = () => {
    return (
        <>
            <Link
                to="/login"
                className={styles.buttonLogin}
                type="button"
                style={{
                    borderBottomRightRadius: '0px',
                    borderTopRightRadius: '0px',
                }}
            >
                Log in
            </Link>
            <Link to="/register" className={styles.buttonRegister} name="register" type="button">
                New Account
            </Link>
        </>
    )
}
