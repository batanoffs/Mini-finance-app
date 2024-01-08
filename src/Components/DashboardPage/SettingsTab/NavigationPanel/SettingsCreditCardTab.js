import { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

export const CreditCard = ({creditCard, name}) => {
    const [state, setState] = useState({
        name: name,
        cardNumber: creditCard.cardNumber,
        expiryDate: creditCard.expiryDate,
        cvc: creditCard.cvv,
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
    }

    return (
        <div
            className="tab-pane fade show active"
            id="profile-tab-pane"
            role="tabpanel"
            aria-labelledby="profile-tab"
            tabIndex="0"
        >
            <h6 className="mb-4">Add Credit Card</h6>
            <form className="custom-form profile-form" action="#" method="post">
                <div className="row width 25%">
                    <div className="col-md-6">
                        <input
                            type="number"
                            name="credit_card_number"
                            className="form-control mt-1"
                            placeholder="Card Number"
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
                            placeholder="Name"
                            onChange={inputChangeHandler}
                            onFocus={inputFocusHandler}
                            required
                        />

                        <input
                            type="string"
                            name="expiryDate"
                            className="form-control mt-1"
                            placeholder="Valid Thru"
                            pattern="\d\d/\d\d"
                            value={state.expiryDate}
                            onChange={inputChangeHandler}
                            onFocus={inputFocusHandler}
                            required
                        />

                        <input
                            type="number"
                            name="cvc"
                            className="form-control mt-1"
                            placeholder="CVC"
                            pattern="\d{3,4}"
                            value={state.cvc}
                            onChange={inputChangeHandler}
                            onFocus={inputFocusHandler}
                            required
                        />
                    </div>

                    <div className="col-md-2 mt-2 mt-md-1">
                            <Cards
                                number={state.cardNumber}
                                expiry={state.expiryDate}
                                cvc={state.cvc}
                                name={state.name}
                                focused={state.focus}
                            />
                    </div>

                    <div className="d-flex">
                    

                    <button type="submit" onClick={onUpdateHandler} className="form-control">
                        Update
                    </button>
                </div>
                </div>
            </form>
        </div>
    );
};
