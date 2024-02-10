import { dataService } from "../../../../services/userDataService";
import { AuthContext } from "../../../../contexts/AuthContext";
import { useState, useContext, useEffect } from "react";
import Autocomplete from "../../../features/Autocomplate";

export const SendMoney = ({ setShowSend }) => {
    const { userDataId } = useContext(AuthContext);
    const [friends, setFriends] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState(""); // Add state to track selected friend

    useEffect(() => {
        dataService.getRelation(userDataId, "friends").then((response) => {
            setFriends(response.friends.map((friend) => friend.fullName));
        });
    }, []);

    const clearHandler = (e) => {
        e.target.value = "";
    };

    const handleFriendSelection = (e) => {
        setSelectedFriend(e.target.value); // Update selectedFriend state based on input value
    };

    return (
        <div className="modal-background" >
            <div className="modal-container">
                <div className="modal-header">
                    <h5 className="modal-title">Изпращане на пари</h5>
                    <button onClick={() => setShowSend(false)}>X</button>
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
                        <div className="form-group ">
                            <label htmlFor="friends">Приятел</label>
                            <Autocomplete name="friends" suggestions={[...friends]}/>
                            {/* <input
                                list="friendOptions"
                                id="friends"
                                name="friends"
                                placeholder="пример: Иван Иванов"
                                value={selectedFriend} // Set input value based on selectedFriend state
                                onChange={handleFriendSelection} // Handle input change to update selectedFriend
                                onBlur={clearHandler} // Clear input value on blur
                            />

                            <datalist id="friendOptions">
                                {friends.map((friend) => (
                                        <option
                                            key={friend}
                                            value={friend}
                                        ></option>
                                    ))}
                            </datalist> */}
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
