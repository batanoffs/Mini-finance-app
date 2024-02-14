import { Link } from "react-router-dom";
import styles from "../custom-block.module.css"

export const ContactInfo = () => {
    return (
            <div className={styles.customBlockContact}>
                <h6>
                    Имате ли нужда от помощ? Моля направете запитване.
                </h6>

                <p>
                    <strong>Свържи се с нас:</strong>
                    <a href="tel: 305-240-9671">
                        (60) 305-240-9671
                    </a>
                </p>

                <Link
                    to="#"
                    className="custom-btn"
                >
                    Започни Чат
                </Link>
            </div>
    );
};
