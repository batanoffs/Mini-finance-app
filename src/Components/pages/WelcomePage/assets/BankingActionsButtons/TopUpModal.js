import { faCreditCard } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useContext } from "react";

import { PaymentForm } from "./PaymentForm";

import { AuthContext } from "../../../../../contexts/AuthContext";
import { cardService } from "../../../../../services/cardGenetarionService";
import { useMessage } from "../../../../../hooks/useMessage";

import modal from "./modal.module.css";

export const TopUp = ({ showModal, setShowModal }) => {
    const [inputState, setInputState] = useState({});
    const { virtualcard, token } = useContext(AuthContext);
    const message = useMessage();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const form = e.target;
        if (!form) {
            console.error("Form element is null");
            message("error", "Не сте въвели данни. Опитайте отново.");
            return;
        }
        const formData = new FormData(form);
        const data = {};

        for (const [name, value] of formData) {
            if (name && value) {
                data[name] = value;
            } else {
                console.error("Null pointer exception: name or value is null");
                message("error", "Въведени са грешни даннни. Опитайте отново.");
                return;
            }
        }

        const amount = Number(data.amount) + Number(virtualcard.top_up);
        const response = await cardService.topUp(
            virtualcard.objectId,
            amount,
            token
        );

        if (!response) {
            message(
                "error",
                "Възникна грешка при изпращане на данните. Моля опитайте отново."
            );
            return;
        } else {
            const balance = response.balance;
            const topUp = response.top_up;
            const prevData = JSON.parse(sessionStorage.getItem("auth") || "{}");
            sessionStorage.setItem( "auth", JSON.stringify({
                    ...prevData,
                    virtualcard: { ...prevData.virtualcard, top_up: topUp, balance: balance },
                })
            );
            setShowModal({ ...showModal, [`topUp`]: false });
            message("success", "Транзакцията е успешна");
        }
    };

    const handleChange = (event) => {
        const result = event.target.value.replace(/\D/g, "");
        setInputState({ ...inputState, [event.target.name]: result });
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
                            onChange={handleChange}
                            id="amount"
                            placeholder="10 лв."
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="paymethod">
                            <FontAwesomeIcon icon={faCreditCard} />
                            Начин на плащане:
                        </label>
                        <select
                            id="paymethod"
                            value={inputState.method}
                            onChange={(e) => {
                                setInputState({
                                    ...inputState,
                                    paymethod: e.target.value,
                                });
                            }}
                        >
                            <option value="">Изберете начин на плащане</option>
                            <option value="debitcard"> Дебитна карта </option>
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
                            disabled={
                                !inputState.amount ||
                                !inputState.paymethod ||
                                !inputState.fullName ||
                                !inputState.cardnumber ||
                                !inputState.expiry ||
                                !inputState.cvv
                            }
                        />
                    </footer>
                </form>
            </div>
        </div>
    );
};
