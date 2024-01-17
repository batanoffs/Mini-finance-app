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
                        style={{
                            width: "10em",
                            textAlign: "center",
                            marginRight: "1em",
                        }}
                        type="button"
                        name="back"
                        to={"/register/terms"}
                        className="button-secondary"
                        value={"Назад"}
                    >
                        Назад
                    </Link>
                    <input
                        style={{ width: "10em"}}
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
