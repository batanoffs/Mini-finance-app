import { Link } from 'react-router-dom'

import { Login, Preview } from './assets/index'
import { title, subTitle } from './constants'
import styles from './home.module.css'

export const Home = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1>{title}</h1>
                    <h5>{subTitle}</h5>

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
