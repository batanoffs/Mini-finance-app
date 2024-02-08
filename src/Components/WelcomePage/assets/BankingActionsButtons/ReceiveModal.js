export const ReceiveMoney = ({ setShowReceive }) => {
    return (
        <div className="modal-background">
            <div className="form-container">
                <div className="modal-header">
                    <h5 className="modal-title">Поискай пари</h5>
                    <button onClick={() => setShowReceive(false)}> x</button>
                </div>

                <div className="form-content">
                    <form className="custom-form">
                        <label htmlFor="amount">Въведи сума</label>
                        <input
                            type="text"
                            name="amount"
                            id="amount"
                            className="form-control"
                            placeholder="Enter amount"
                        />
                        <label htmlFor="card">Избери карта</label>
                        <input
                            type="text"
                            name="card"
                            id="card"
                            className="form-control"
                            placeholder="Add credit card"
                        />
                        <input
                            className="custom-btn"
                            type="submit"
                            value="Изпрати"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};
