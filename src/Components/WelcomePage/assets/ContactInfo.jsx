import { Link } from "react-router-dom";

export const ContactInfo = () => {
    return (
        <div className="col-lg-5 col-12">
            <div className="custom-block custom-block-contact">
                <h6 className="mb-5">
                    Имате ли нужда от помощ? Моля направете запитване.
                </h6>

                <p>
                    <strong>Свържи се с нас:</strong>
                    <a href="tel: 305-240-9671" className="ms-2">
                        (60) 305-240-9671
                    </a>
                </p>

                <Link
                    to="#"
                    className="btn custom-btn mt-3"
                >
                    Започни Чат
                </Link>
            </div>
        </div>
    );
};
