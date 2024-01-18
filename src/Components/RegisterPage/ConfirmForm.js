import { Link } from "react-router-dom";
import { AuthContext  } from "../../contexts/AuthContext";
import { useContext } from "react";

export const ConfirmForm = () => {
    const { onSumbitHandler } = useContext(AuthContext);
    return (
        <div className="form-container">
            <div className="form-content">
                <header>
                    <h6>Проверка на данните</h6>
                </header>

                <article></article>
                <footer>
                    <Link
                        type="button"
                        name="back"
                        to={"/register/terms"}
                        className="button-secondary"
                        value={"Назад"}
                    >
                        Назад
                    </Link>
                    <input
                        name="register"
                        type="button"
                        className="button-primary"
                        value={"Регистрация"}
                        onClick={onSumbitHandler}
                    />
                </footer>
            </div>
        </div>
    );
};
