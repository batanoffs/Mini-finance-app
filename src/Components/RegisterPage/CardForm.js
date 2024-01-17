import { Link } from "react-router-dom";
export const CardForm = ({changeHandler, values}) => {
    console.log(values.creditCard);
    console.log(values.creditCard.cardNumber);

    const card = values.creditCard;

    // { cardNumber,  cardHolder,  expiryDate, cvv }

    return (
        <div className="form-container">
            <div className="form-content">
                <form action="#" method="post">
                    <header>
                        <h6>Въведи своята карта</h6>
                    </header>
                    <input
                        type="text"
                        className="form-control"
                        name="cardNumber"
                        placeholder="номер на карта"
                        value={card.cardNumber} 
                        // cardNumber
                        onChange={changeHandler}
                    />

                    <input
                        type="tel"
                        className="form-control"
                        name="cardHolder"
                        placeholder="картодържател"
                        // value={cardHolder}
                        // cardHolder
                        onChange={changeHandler}
                    />

                    <input
                        type="text"
                        className="form-control"
                        name="expiryDate"
                        placeholder="валидна до"
                        // value={expiryDate}
                        // expiryDate
                        onChange={changeHandler}
                    />

                    <input
                        type="text"
                        className="form-control"
                        name="cvv"
                        placeholder="CVV"
                        // value={cvv}
                        // cvv
                        onChange={changeHandler}
                    />
                </form>

                <footer>
                    <Link
                        to={"/register/userinfo"}
                        style={{
                            width: "10em",
                            textAlign: "center",
                            marginRight: "1em",
                        }}
                        type="submit"
                        name="submit"
                        className="button-secondary"
                    >
                        Назад
                    </Link>
                    <Link
                        to={"/register/terms"}
                        style={{ width: "10em", textAlign: "center" }}
                        type="submit"
                        name="submit"
                        className="button-primary"
                    >
                        Напред
                    </Link>
                </footer>
            </div>
        </div>
    );
};
