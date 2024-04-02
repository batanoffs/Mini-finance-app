import { useState, useContext } from "react";
import Cards from "react-credit-cards-2";

import { AuthContext } from "../../../../../contexts/AuthContext";

import "react-credit-cards-2/dist/es/styles-compiled.css";

export const VirtualCard = () => {
    const { name, virtualcard } = useContext(AuthContext);
    const [state, setState] = useState({
        name: name,
        cardNumber: virtualcard.number,
        expiryDate: virtualcard.expiration,
        cvc: virtualcard.cvv,
        focus: "",
    });

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setState((prev) => ({ ...prev, [name]: value }));
    };
    const inputFocusHandler = (e) => {
        setState((prev) => ({ ...prev, focus: e.target.name }));
    };

    const onUpdateHandler = () => {
        console.log("updated");
    };

    return (
        <div className="form-container">
            <div
                className="form-content"
                style={{ display: "flex", flexDirection: "row", gap: "10em" }}
            >
                <form className="custom-form" method="post">
                    <div className="form-group">
                        <label htmlFor="credit_card_number">Номер</label>

                        <input
                            type="number"
                            name="credit_card_number"
                            className="form-control"
                            placeholder="Номер на карта"
                            value={state.cardNumber}
                            onChange={inputChangeHandler}
                            onFocus={inputFocusHandler}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="credit_card_number">Име</label>

                        <input
                            type="text"
                            name="fullname"
                            autoComplete="off"
                            className="form-control"
                            value={state.name}
                            placeholder="Картодържател"
                            onChange={inputChangeHandler}
                            onFocus={inputFocusHandler}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="credit_card_number">Валидна до</label>

                        <input
                            type="string"
                            name="expiryDate"
                            className="form-control"
                            placeholder="Валидна до"
                            pattern="\d\d/\d\d"
                            value={state.expiryDate}
                            onChange={inputChangeHandler}
                            onFocus={inputFocusHandler}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="credit_card_number">CVV</label>
                        <input
                            type="password"
                            name="cvv"
                            className="form-control"
                            placeholder="CVV"
                            pattern="\d{3,4}"
                            value={state.cvv}
                            onChange={inputChangeHandler}
                            onFocus={inputFocusHandler}
                            required
                        />
                    </div>

                    <footer>
                        <input
                            type="submit"
                            value="Запази"
                            onClick={onUpdateHandler}
                            className="button-primary"
                        />
                    </footer>
                </form>
                <div className="form-group">
                    <Cards
                        number={state.cardNumber}
                        expiry={state.expiryDate}
                        cvc={state.cvv}
                        name={state.name}
                        focused={state.focus}
                    />
                </div>
            </div>
        </div>
    );
};
