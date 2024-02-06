export const TopUp = ({ setShowTopUp }) => {
    return (
        <div className="modal-background">
            <div className="modal-container">
                <div className="modal-header">
                    <h3 className="modal-title">Захранване на акаунт</h3>
                    <button onClick={() => setShowTopUp(false)}> x</button>
                </div>
                <div className="modal-body">
                    <form>
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
                    </form>
                </div>
                <div className="modal-footer">
                    <button className="modal-title">Захрани</button>
                </div>
            </div>
        </div>
    );
};
