import { useValidate } from "../../../../../hooks/useValidate";

import modal from "./modal.module.css";
import errorstyle from "../../../RegisterPage/register.module.css";

export const PaymentForm = ({ inputState, setInputState }) => {
    const { error, errorHandler, clearErrorHandler } = useValidate({});

    const handleChange = (e) => {
        setInputState({ ...inputState, [e.target.name]: e.target.value });
    };

    const checkInputHandler = (e) => {
        if (e.target.value === "") {
            return;
        } else {
            if (errorHandler(e)) {
                e.target.style.borderColor = "red";
            } else {
                e.target.style.borderColor = "lightgreen";
            }
        }
    };

    if (inputState.paymethod === "debitcard") {
        return (
            <div className={modal.modalOptions}>
                <div className="form-group">
                    <label htmlFor="debitcard">Номер:</label>
                    <input
                        required
                        type="text"
                        name="debitcard"
                        value={inputState.number}
                        onChange={handleChange}
                        onBlur={checkInputHandler}
                        onFocus={clearErrorHandler}
                        className={modal.input}
                    />
                </div>
                <small className={errorstyle.error}>{error.debitcard}</small>

                <div className="form-group">
                    <label htmlFor="expiry">Валидност:</label>
                    <input
                        required
                        type="text"
                        name="expiry"
                        value={inputState.expiry}
                        onChange={handleChange}
                        onBlur={checkInputHandler}
                        onFocus={clearErrorHandler}
                        className={modal.input}
                    />
                </div>
                <small className={errorstyle.error}>{error.expiry}</small>

                <div className="form-group">
                    <label htmlFor="cvv">CVV:</label>
                    <input
                        required
                        type="text"
                        name="cvv"
                        className={modal.input}
                        value={inputState.cvv}
                        onChange={handleChange}
                        onBlur={checkInputHandler}
                        onFocus={clearErrorHandler}
                    />
                </div>
                <small className={errorstyle.error}>{error.cvv}</small>
            </div>
        );
    } else if (inputState.paymethod === "paypal") {
        return (
            <>
                <div className={modal.modalOptions}>
                    <label htmlFor="email">Имейл:</label>
                    <input
                        required
                        type="email"
                        name="email"
                        className={modal.input}
                        value={inputState.email}
                        onChange={handleChange}
                        onBlur={checkInputHandler}
                        onFocus={clearErrorHandler}
                    />
                </div>
                <small className={errorstyle.error}>{error.email}</small>
            </>
        );
    }
};
