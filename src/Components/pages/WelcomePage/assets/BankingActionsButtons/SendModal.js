import { dataService } from "../../../../../services/userDataService";
import { AuthContext } from "../../../../../contexts/AuthContext";
import { useState, useContext, useEffect } from "react";
import { Autocomplete } from "../../../../features/Autocomplate";
import modal from "./modal.module.css";

export const SendMoney = ({ setShowSend }) => {
    const { userDataId } = useContext(AuthContext);
    const [friends, setFriends] = useState([]);
    const [userInput, setUserInput] = useState({ amount: "", friends: "" });

    useEffect(() => {
        dataService.getRelation(userDataId, "friends").then((response) => {
            setFriends(
                response.friends.map((friend) => {
                    if (friend.fullName) {
                        return friend.fullName;
                    }
                })
            );
        });
    }, []);

    const onFormSubmitHandler = (e) => {
        e.PreventDefault();
    };

    return (
        <div className={modal.modalBackground}>
            <div className={modal.modalContainer}>
                <div className={modal.modalHeader}>
                    <h5 className="modal-title">Изпращане на пари</h5>
                    <button onClick={() => setShowSend(false)}>X</button>
                </div>

                <div className="form-content">
                    <form onSubmit={onFormSubmitHandler}>
                        <div className="form-group">
                            <label htmlFor="amount">Сума</label>
                            <input
                                type="text"
                                name="amount"
                                id="amount"
                                className="form-control"
                                placeholder="10лв"
                                value={userInput.amount}
                                onChange={(e) => console.log(e.target)}
                            />
                        </div>
                        <div className="form-group ">
                            <label htmlFor="friends">Приятел</label>
                            <Autocomplete
                                name="friends"
                                userInput={userInput}
                                setUserInput={setUserInput}
                                suggestions={[...friends]}
                            />
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
