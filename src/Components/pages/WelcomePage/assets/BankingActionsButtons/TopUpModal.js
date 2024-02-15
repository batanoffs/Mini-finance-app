import modal from "./modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-regular-svg-icons";

export const TopUp = ({ setShowTopUp, setShowReceive }) => {
    return (
        <div className={modal.modalBackground}>
            <div className={modal.modalContainer}>
                <div className={modal.modalHeader}>
                    <h5 className="modal-title">Захранване на акаунт</h5>
                    <button onClick={() => setShowTopUp(false)}> x</button>
                </div>
                <div className="form-content">
                    <form className="custom-form">
                        <p>Начин на плащане</p>
                        <div className={modal.modalOptions}>
                            <div className="form-group">
                                <label htmlFor="amount">Въведи сума</label>
                                <input
                                    type="text"
                                    name="amount"
                                    id="amount"
                                    placeholder="Enter amount"
                                />
                            </div>
                        </div>
                        <div className={modal.modalOptions}>
                            <div className="form-group">
                                <FontAwesomeIcon icon={faCreditCard} />
                                <label htmlFor="card">
                                    Unicredit Bulbank AD
                                </label>
                                <input
                                    type="button"
                                    name="card"
                                    value="промени"
                                    id="card"
                                    placeholder="Add credit card"
                                />
                            </div>
                        </div>

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
        </div>
    );
};
