import { dataService } from "../../../../services/userDataService";
import { AuthContext } from "../../../../contexts/AuthContext";
import { useState, useContext, useEffect } from "react";

export const SendMoney = ({ setShowSend }) => {
    const { userDataId } = useContext(AuthContext);
    const [friends, setFriends] = useState([]);
    const [friendValue, setFriendValue] = useState("");

    useEffect(() => {
        dataService.getRelation(userDataId, "friends").then((response) => {
            const updatedFriends = response.friends.map(
                (friend) => friend.fullName
            );
            setFriends(updatedFriends);
        });
    }, []);

    const handleChange = (event) => {
        setFriendValue(event.target.value);
    };

    const clearHandler = (e) => {
        e.target.value = "";
    };

    return (
        <div className="modal-background">
            <div className="modal-container">
                <div className="modal-header">
                    <h5 className="modal-title">Изпращане на пари</h5>
                    <button onClick={() => setShowSend(false)}> x</button>
                </div>

                <div className="form-content">
                    <form>
                        <div className="form-group">
                            <label htmlFor="amount">Сума</label>
                            <input
                                type="text"
                                name="amount"
                                id="amount"
                                className="form-control"
                                placeholder="10лв"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="friends">Приятел</label>
                            <input
                                list="friends"
                                id="friends"
                                name="friends"
                                onChange={handleChange}
                                onClick={clearHandler}
                                onFocus={clearHandler}
                                value={friendValue}
                            />

                            <datalist id="friends">
                                {friends.map((friend) => (
                                    <option
                                        key={friend}
                                        value={friend}
                                    ></option>
                                ))}
                            </datalist>
                        </div>

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
