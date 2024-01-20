import { Link } from "react-router-dom";
export const CardForm = (props) => {
    // { cardNumber,  cardHolder,  expiryDate, cvv }
    return (
        <div className="form-container">
            <div className="form-content">
                <form action="#" method="post">
                    <header>
                        <h6>Въведи своята карта</h6>
                    </header>

                    <label htmlFor="cardNumber">
                        <p className="star">*</p>Card Number:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="cardNumber"
                        id="cardNumber"
                        placeholder="номер на карта"
                        value={props.creditCard.cardNumber}
                        onChange={props.changeHandler}
                    />

                    <label htmlFor="cardHolder">
                        <p className="star">*</p>Card Holder:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="cardHolder"
                        id="cardHolder"
                        placeholder="картодържател"
                        value={props.creditCard.cardHolder}
                        onChange={props.changeHandler}
                    />

                    <label htmlFor="expiryDate">
                        <p className="star">*</p>Expiry Date:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="expiryDate"
                        id="expiryDate"
                        placeholder="валидна до"
                        value={props.creditCard.expiryDate}
                        onChange={props.changeHandler}
                    />

                    <label htmlFor="cvv">
                        <p className="star">*</p>CVV:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="cvv"
                        id="cvv"
                        placeholder="CVV"
                        value={props.creditCard.cvv}
                        onChange={props.changeHandler}
                    />
                </form>

                <footer>
                    <Link
                        to={"/register/userinfo"}
                        type="submit"
                        name="prev"
                        className="button-secondary"
                        onClick={props.currentStepsHendler}
                    >
                        Назад
                    </Link>
                    <Link
                        to={"/register/identity"}
                        type="submit"
                        name="next"
                        className="button-primary"
                        onClick={props.currentStepsHendler}
                    >
                        Напред
                    </Link>
                </footer>
            </div>
        </div>
    );
};
