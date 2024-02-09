export const SendMoney = ({ setShowSend }) => {
    const getFriends = () => {};
    return (
        <div className="modal-background">
            <div className="modal-container">
                <div className="modal-header">
                    <h5 className="modal-title">Изпращане на пари</h5>
                    <button onClick={() => setShowSend(false)}> x</button>
                </div>

                <div className="form-content">
                    <form>
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
                        <field className="form-group">
                            <label htmlFor="card">Приятел</label>
                            <input
                                list="friends"
                                id="friends"
                                name="friends"
                                onFocus={getFriends}
                            />
                        </field>
                        <datalist id="friends">
                            {/* friends list */}
                            <option value="Chocolate"></option>
                            <option value="Coconut"></option>
                            <option value="Mint"></option>
                            <option value="Strawberry"></option>
                            <option value="Vanilla"></option>
                        </datalist>
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
