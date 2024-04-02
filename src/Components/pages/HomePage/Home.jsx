import { Link } from "react-router-dom";
import { Preview } from "./assets/Preview";
import { Login } from "../LoginPage/Login";

import styles from "./home.module.css";

export const Home = () => {
    return (
        <div className={styles.homeContainer}>
            
            <div className={styles.heroSection}>
                <h1>Отворете банков акаунт и вземете вашата карта</h1>
                <p>
                    Създадохме тази платформа безплатна, за да бъде достъпна за
                    всеки един от вас.
                </p>
                <div className={styles.buttonContainer}>
                    <Link
                        to="/about"
                        className="button-secondary"
                        style={{ backgroundColor: "transparent" }}
                    >
                        Научи повече
                    </Link>
                    <Link to="/register" className="button-primary">
                        Вземи своята карта
                    </Link>
                </div>
                <Preview className={styles.scalingSvg} />
            </div>

            <div className={styles.loginContainer}>
                <Login />
            </div>
        </div>
    );
};
