export const ReceiveMoney = ({ setShowReceive }) => {
    return (
        <div className="modal-background">
            <div className="modal-container">
                <div className="modal-header">
                    <h5 className="modal-title">Поискай пари</h5>
                    <button onClick={() => setShowReceive(false)}> x</button>
                </div>

                <div className="form-content">
                    <form>
                        <label htmlFor="amount">Въведи сума</label>
                        <input
                            type="text"
                            name="amount"
                            id="amount"
                            className="form-control"
                            placeholder="10лв"
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
