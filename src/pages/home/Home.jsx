import { Link } from 'react-router-dom'
import { Login, Preview } from './assets/index'

import styles from './home.module.css'

export const Home = () => {
    const title = 'The easiest way to make transactions online'
    return (
        <div className={styles.wrapper}>
            <div className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1>{title}</h1>
                    <h4>
                        We created this platform for free to make it accessible to each one of you
                        Register now and get your free card
                    </h4>

                    <div className={styles.buttonContainer}>
                        <Link to="/about" className="button-secondary">
                            Find out more
                        </Link>
                        <Link to="/register" className="button-primary">
                            Get your card
                        </Link>
                    </div>
                </div>
                <Preview styles={styles} />
            </div>

            <div className={styles.loginContainer}>
                <Login />
            </div>
        </div>
    )
}
