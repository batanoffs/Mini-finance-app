// import { Link } from "react-router-dom";
import containers from './containers.module.css'

export const ContactInfo = () => {
    return (
        <div className={containers.customBlockContact}>
            <h6>Need help? Please submit a request.</h6>

            <p>
                <strong>Get in touch:</strong>
                <a href="tel: 305-240-9671">(60) 305-240-9671</a>
            </p>

            {/* <Link
                    to="#"
                    className="custom-btn"
                >
                    Start Chat
                </Link> */}
        </div>
    )
}
