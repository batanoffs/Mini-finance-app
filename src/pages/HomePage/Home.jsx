import { Link } from 'react-router-dom'
import { Login, Preview } from './assets/index'

import styles from './home.module.css'

export const Home = () => {
    return (
        <div className={styles.homeContainer}>
            <div className={styles.heroSection}>
                <h1>Open a bank account and get your card now</h1>
                <p>We created this platform for free to make it accessible to each one of you.</p>
                <div className={styles.buttonContainer}>
                    <Link
                        to="/about"
                        className="button-secondary"
                        style={{ backgroundColor: 'transparent' }}
                    >
                        Find out more
                    </Link>
                    <Link to="/register" className="button-primary">
                        Get your card
                    </Link>
                </div>
                <Preview className={styles.scalingSvg} />
            </div>

            <div className={styles.loginContainer}>
                <Login />
            </div>
        </div>
    )
}
