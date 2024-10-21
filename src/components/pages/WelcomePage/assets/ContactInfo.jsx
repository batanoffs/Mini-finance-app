// import { Link } from "react-router-dom";
import styles from "../custom-block.module.css"

export const ContactInfo = () => {
    return (
            <div className={styles.customBlockContact}>
                <h6>
                    Need help? Please submit a request.
                </h6>

                <p>
                    <strong>Get in touch:</strong>
                    <a href="tel: 305-240-9671">
                        (60) 305-240-9671
                    </a>
                </p>

                {/* <Link
                    to="#"
                    className="custom-btn"
                >
                    Start Chat
                </Link> */}
            </div>
    );
};

