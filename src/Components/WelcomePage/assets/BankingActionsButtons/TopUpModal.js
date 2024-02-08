export const TopUp = ({ setShowTopUp }) => {
    return (
        <div className="modal-background">
            <div className="modal-container">
                <div className="modal-header">
                    <h5 className="modal-title">Захранване на акаунт</h5>
                    <button onClick={() => setShowTopUp(false)}> x</button>
                </div>

                <div className="modal-body">
                    <form>
                        <div>
                            <label htmlFor="amount">Въведи сума</label>
                            <input
                                type="text"
                                name="amount"
                                id="amount"
                                className="form-control"
                                placeholder="Enter amount"
                            />
                        </div>
                        <div>
                            <label htmlFor="card">Избери карта</label>
                            <input
                                type="text"
                                name="card"
                                id="card"
                                className="form-control"
                                placeholder="Add credit card"
                            />
                        </div>
                        <input
                            className="custom-btn"
                            type="submit"
                            value="Зареди"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};
