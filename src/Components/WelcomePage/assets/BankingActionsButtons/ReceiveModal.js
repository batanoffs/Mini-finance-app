export const ReceiveMoney = ({ setShowReceive }) => {
    return (
        <div className="modal-background">
            <div className="modal-container">
                <div className="modal-header">
                    <h5 className="modal-title">Поискай пари</h5>
                    <button onClick={() => setShowReceive(false)}> x</button>
                </div>

                <div className="form-content">
                    <form className="custom-form">
                        <field className="form-group">
                            <label htmlFor="amount">Въведи сума</label>
                            <input
                                type="text"
                                name="amount"
                                id="amount"
                                className="form-control"
                                placeholder="10лв"
                            />
                        </field>
                        <footer>
                            <input
                                className="button-primary"
                                type="submit"
                                value="Изпрати"
                                style={{ width: "100%" }}
                            />
                        </footer>
                    </form>
                </div>
            </div>
        </div>
    );
};
