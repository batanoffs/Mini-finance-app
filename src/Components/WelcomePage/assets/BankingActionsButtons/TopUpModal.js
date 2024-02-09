export const TopUp = ({ setShowTopUp }) => {
    return (
        <div className="modal-background">
            <div className="modal-container">
                <div className="modal-header">
                    <h5 className="modal-title">Захранване на акаунт</h5>
                    <button onClick={() => setShowTopUp(false)}> x</button>
                </div>

                <div className="form-content">
                    <form className="custom-form">
                        <field className="form-group">
                            <label htmlFor="amount">Въведи сума</label>
                            <input
                                type="text"
                                name="amount"
                                id="amount"
                                placeholder="Enter amount"
                            />
                        </field>
                        <field className="form-group">
                            <label htmlFor="card">Избери карта</label>
                            <input
                                type="text"
                                name="card"
                                id="card"
                                placeholder="Add credit card"
                            />
                        </field>
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
