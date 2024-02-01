import { Link } from "react-router-dom";

export const ContactInfo = () => {
    return (
            <div className="custom-block custom-block-contact">
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
