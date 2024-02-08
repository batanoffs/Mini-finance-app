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
                        <div>
                            <label htmlFor="amount">Въведи сума</label>
                            <input
                                type="text"
                                name="amount"
                                id="amount"
                                className="form-control"
                                placeholder="10лв"
                            />
                        </div>
                        <div>
                            <label htmlFor="card">Приятел</label>
                            <input
                                list="friends"
                                id="friends"
                                name="friends"
                                onFocus={getFriends}
                            />
                        </div>
                        <datalist id="friends">
                            {/* friends list */}
                            <option value="Chocolate"></option>
                            <option value="Coconut"></option>
                            <option value="Mint"></option>
                            <option value="Strawberry"></option>
                            <option value="Vanilla"></option>
                        </datalist>
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
