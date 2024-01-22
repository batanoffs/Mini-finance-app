import { Link } from "react-router-dom";
import { cardService } from "../../services/cardService";

export const CardForm = (props) => {
    // { balance: 0, issuer: "", number: "", brand: "", expiration: "", cvv: 0 }

    const generateVirtualCard = async () => {
            const response = await cardService.getCard();
            console.log(response);

            // if (response.status === "ok") {
            //     props.creditCard = response.data;
            // }
    };

    return (
        <div className="form-container">
            <div className="form-content">
                <form action="#" method="post">
                    <header>
                        <h6>Генерирай своята карта</h6>
                    </header>

                    <label htmlFor="cardNumber">
                        <p className="star">*</p>Card Number:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="cardNumber"
                        disabled
                        id="cardNumber"
                        placeholder="номер на карта"
                        value={props.creditCard.number}
                        onChange={props.changeHandler}
                    />

                    <label htmlFor="cardHolder">
                        <p className="star">*</p>Issuer:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="issuer"
                        id="issuer"
                        disabled
                        placeholder="издадена от:"
                        value={props.creditCard.issuer}
                        onChange={props.changeHandler}
                    />
                    <label htmlFor="balance">
                        <p className="star">*</p>Balance:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="balance"
                        id="balance"
                        disabled
                        placeholder="balance:"
                        value={props.creditCard.balance}
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
                        disabled
                        placeholder="валидна до"
                        value={props.creditCard.expiration}
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
                        disabled
                        placeholder="CVV"
                        value={props.creditCard.cvv}
                        onChange={props.changeHandler}
                    />

                    <input
                        type="button"
                        className="button-primary"
                        onClick={generateVirtualCard}
                        value="Generate"
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
