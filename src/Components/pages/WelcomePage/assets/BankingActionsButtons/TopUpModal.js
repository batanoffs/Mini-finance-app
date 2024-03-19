import modal from "./modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { PaymentForm } from "./PaymentForm";

export const TopUp = ({ showModal, setShowModal }) => {
    const [inputState, setInputState] = useState({});

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const form = e.target;
        if (!form) {
            console.error("Form element is null");
            return;
        }
        const formData = new FormData(form);
        const data = {};
        for (const [name, value] of formData) {
            if (name && value) {
                data[name] = value;
            } else {
                console.error("Null pointer exception: name or value is null");
                return;
            }
        }
        console.log(data);

        setShowModal({ ...showModal, [`topUp`]: false });
    };

    return (
        <div className={modal.modalBackground}>
            <div className={modal.modalContainer}>
                <div className={modal.modalHeader}>
                    <h5 className="modal-title">Захранване на акаунт</h5>
                    <button
                        onClick={() =>
                            setShowModal({ ...showModal, [`topUp`]: false })
                        }
                    >
                        X
                    </button>
                </div>
                <form onSubmit={onSubmitHandler} className="custom-form">
                        <div className="form-group">
                            <label htmlFor="amount">Сума:</label>
                            <input
                                type="text"
                                name="amount"
                                value={inputState.amount}
                                onChange={setInputState}
                                id="amount"
                                placeholder="Enter amount"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="payment-method">
                                Начин на плащане:
                            </label>
                            <select
                                id="payment-method"
                                value={inputState.payment_method}
                                onChange={(e) => {
                                    setInputState({
                                        ...inputState,
                                        payment_method: e.target.value,
                                    });
                                }}
                            >
                                <option value="">
                                    Изберете начин на плащане
                                </option>
                                <option value="banktransfer">
                                    Банков трансфер
                                </option>

                                <option value="debitcard">
                                    {" "}
                                    <FontAwesomeIcon icon={faCreditCard} />
                                    Дебитна карта{" "}
                                </option>
                                <option value="paypal">PayPal</option>
                            </select>
                        </div>
                        <PaymentForm
                            inputState={inputState}
                            setInputState={setInputState}
                        />

                    <footer>
                        <input
                            className="button-primary"
                            style={{ width: `100%`, textAlign: `center` }}
                            type="submit"
                            value="Зареди"
                        />
                    </footer>
                </form>
            </div>
        </div>
    );
};
