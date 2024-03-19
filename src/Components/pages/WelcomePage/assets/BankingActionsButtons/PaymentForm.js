import modal from "./modal.module.css";

export const PaymentForm = ({ inputState, setInputState }) => {
    const handleChange = (e) => {
        setInputState({ ...inputState, [e.target.name]: e.target.value });
    };

    const validateEmail = (email) => {
        const re =
            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return re.test(String(email).toLowerCase());
    };

    const validateIBAN = (iban) => {
        const re = /^[a-zA-Z]{2}\d{2}[a-zA-Z0-9]{4}\d{7}([a-zA-Z0-9]?){0,16}$/;
        return re.test(String(iban).toUpperCase());
    };

    const validateCVV = (cvv) => {
        const re = /^\d{3,4}$/;
        return re.test(String(cvv));
    };

    const validateExpiry = (expiry) => {
        const re = /^((0[1-9])|(1[0-2]))\/([0-9]{2}|[1-9][0-9])$/;
        return re.test(String(expiry));
    };

    const checkInputHandler = (e) => {
        if (!e.target.checkValidity()) {
            e.target.style.borderColor = "red";
            e.target.nextElementSibling.style.display = "block";
        } else {
            e.target.style.borderColor = "lightgreen";
            e.target.nextElementSibling.style.display = "none";
        }
    };

    if (inputState.payment_method === "banktransfer") {
        return (
            <div className={modal.modalOptions}>
                <div className="form-group">
                    <label htmlFor="bank">Bank:</label>
                    <input
                        type="text"
                        name="bank"
                        value={inputState.bank}
                        onChange={handleChange}
                        onBlur={checkInputHandler}
                        required
                        className={modal.input}
                        pattern="[a-zA-Z\s]+"
                    />
                    <small style={{ display: "none", color: "red" }}>
                        Must only contain letters
                    </small>
                </div>
                <div className="form-group">
                    <label htmlFor="iban">IBAN:</label>
                    <input
                        type="text"
                        name="iban"
                        value={inputState.iban}
                        onChange={handleChange}
                        onBlur={checkInputHandler}
                        required
                        className={modal.input}
                        pattern={validateIBAN.source}
                    />
                    <small style={{ display: "none", color: "red" }}>
                        Must only contain letters and numbers
                    </small>
                </div>
                <div className="form-group">
                    <label htmlFor="swift">SWIFT:</label>
                    <input
                        type="text"
                        name="swift"
                        value={inputState.swift}
                        onChange={handleChange}
                        onBlur={checkInputHandler}
                        required
                        className={modal.input}
                        pattern="[a-zA-Z0-9]{4,5}"
                    />
                    <small style={{ display: "none", color: "red" }}>
                        Must only contain letters and numbers, 4-5 max
                        characters
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="description">Описание:</label>
                    <input
                        type="text"
                        name="description"
                        value={inputState.description}
                        onChange={handleChange}
                        onBlur={checkInputHandler}
                        required
                        className={modal.input}
                        pattern="^[a-zA-Z\s]+$"
                    />
                    <small style={{ display: "none", color: "red" }}>
                        Must only contain letters and spaces
                    </small>
                </div>
            </div>
        );
    } else if (inputState.payment_method === "debitcard") {
        return (
            <div className={modal.modalOptions}>

                <div className="form-group">
                    <label htmlFor="number">Номер:</label>
                    <input
                        type="text"
                        name="number"
                        value={inputState.number}
                        onChange={handleChange}
                        onBlur={checkInputHandler}
                        required
                        className={modal.input}
                        pattern="^\d{16}$"
                    />
                    <small style={{ display: "none", color: "red" }}>
                        Must only contain 16 digits
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="expiry">Валидност:</label>
                    <input
                        type="text"
                        name="expiry"
                        value={inputState.expiry}
                        onChange={handleChange}
                        required
                        onBlur={checkInputHandler}
                        className={modal.input}
                        pattern={validateExpiry.source}
                    />
                    <small style={{ display: "none", color: "red" }}>
                        Must be in format MM/YY
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="cvv">CVV:</label>
                    <input
                        type="text"
                        name="cvv"
                        value={inputState.cvv}
                        onChange={handleChange}
                        required
                        onBlur={checkInputHandler}
                        className={modal.input}
                        pattern={validateCVV.source}
                    />
                    <small style={{ display: "none", color: "red" }}>
                        Must only contain 3 or 4 digits
                    </small>
                </div>
            </div>
        );
    } else if (inputState.payment_method === "paypal") {
        return (
            <div className={modal.modalOptions}>
                <label htmlFor="email">Имейл:</label>
                <input
                    type="email"
                    name="email"
                    value={inputState.email}
                    onChange={handleChange}
                    required
                    onBlur={checkInputHandler}
                    className={modal.input}
                    pattern={validateEmail.source}
                />
                <small style={{ display: "none", color: "red" }}>
                    Must only contain letters, digits, symbols ._%+ and @
                </small>
            </div>
        );
    }
};
