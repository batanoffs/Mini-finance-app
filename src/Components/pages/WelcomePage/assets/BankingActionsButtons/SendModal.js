import { dataService } from "../../../../../services/userDataService";
import { AuthContext } from "../../../../../contexts/AuthContext";
import { useState, useContext, useEffect } from "react";
import { Autocomplete } from "../../../../features/Autocomplate";
import { transactions } from "../../../../../services/userTransactionService";
import modal from "./modal.module.css";

export const SendMoney = ({ setShowSend }) => {
    const { userDataId } = useContext(AuthContext);
    const [receiver, setReceiver] = useState([]);
    const [userInput, setUserInput] = useState({ amount: 0, friends: "" });

    useEffect(() => {
        dataService.getRelation(userDataId, "friends").then((response) => {
            setReceiver(
                response.friends.map((friend) => {
                    if (friend.fullName) {
                        return friend.fullName;
                    } else {
                        return null;
                    }
                })
            );
        });
    }, [userDataId]);

    const setUserInputHandler = (e) => {
        setUserInput({ ...userInput, [e.target.name]: e.target.value });
    }

    const onFormSubmitHandler = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const { amount, friends } = Object.fromEntries(form);
        console.log(amount, friends);
        if( !amount || !friends ) {
            return;
        }
        
        const response = await transactions.send(friends, Number(amount), "+");
        console.log(response);
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
                                onChange={setUserInputHandler}
                            />
                        </div>
                        <div className="form-group ">
                            <label htmlFor="friends">Приятел</label>
                            <Autocomplete
                                name="friends"
                                userInput={userInput}
                                setUserInput={setUserInput}
                                suggestions={[...receiver]}
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
