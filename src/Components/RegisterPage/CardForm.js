import { Link } from "react-router-dom";
export const CardForm = () => {
    return (
        <section className="form-container">
            <div className="form-content">
                <form action="#" method="post">
                    <header>
                        <h6>Въведи своята карта</h6>
                    </header>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="номер на карта"
                    />

                    <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        placeholder="картодържател"
                    />

                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        placeholder="валидна до"
                    />

                    <input
                        type="text"
                        className="form-control"
                        id="city"
                        placeholder="CCV"
                    />
                </form>

                <footer>
                    <Link
                        to={"/register/userinfo"}
                        style={{ width: "10em", textAlign: "center", marginRight: "1em" }}
                        type="submit"
                        name="submit"
                        className="button-secondary"
                    >
                        Назад
                    </Link>
                    <Link
                        to={"/register/terms"}
                        style={{ width: "10em", textAlign: "center"}}
                        type="submit"
                        name="submit"
                        className="button-primary"
                    >
                        Напред
                    </Link>
                </footer>
            </div>
        </section>
    );
};
