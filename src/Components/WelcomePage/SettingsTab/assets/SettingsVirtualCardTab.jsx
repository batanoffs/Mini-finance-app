import { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { AuthContext } from "../../../../contexts/AuthContext";
import { useContext } from "react";

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
        <div
            className="tab-pane fade show active"
            id="profile-tab-pane"
            role="tabpanel"
            aria-labelledby="profile-tab"
            tabIndex="0"
        >
            <h5 className="mb-4">Добави карта</h5>
            <form className="custom-form profile-form" action="#" method="post">
                <div className="row width 25%">
                    <div className="col-md-6">
                        <input
                            type="number"
                            name="credit_card_number"
                            className="form-control mt-1"
                            placeholder="Номер на карта"
                            value={state.cardNumber}
                            onChange={inputChangeHandler}
                            onFocus={inputFocusHandler}
                            required
                        />

                        <input
                            type="text"
                            name="fullname"
                            autoComplete="off"
                            className="form-control mt-1"
                            value={state.name}
                            placeholder="Картодържател"
                            onChange={inputChangeHandler}
                            onFocus={inputFocusHandler}
                            required
                        />

                        <input
                            type="string"
                            name="expiryDate"
                            className="form-control mt-1"
                            placeholder="Валидна до"
                            pattern="\d\d/\d\d"
                            value={state.expiryDate}
                            onChange={inputChangeHandler}
                            onFocus={inputFocusHandler}
                            required
                        />

                        <input
                            type="password"
                            name="cvv"
                            className="form-control mt-1"
                            placeholder="CVV"
                            pattern="\d{3,4}"
                            value={state.cvv}
                            onChange={inputChangeHandler}
                            onFocus={inputFocusHandler}
                            required
                        />
                    </div>

                    <div className="col-md-2 mt-2 mt-md-1">
                        <Cards
                            number={state.cardNumber}
                            expiry={state.expiryDate}
                            cvc={state.cvv}
                            name={state.name}
                            focused={state.focus}
                        />
                    </div>

                    <div className="d-flex">
                        <button
                            type="submit"
                            onClick={onUpdateHandler}
                            className="form-control"
                        >
                            Запази
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};
