import { dataService } from "../../../../../services/userDataService";
import { AuthContext } from "../../../../../contexts/AuthContext";
import { useState, useContext, useEffect } from "react";
import { Autocomplete } from "../../../../features/Autocomplate";
import { transactions } from "../../../../../services/transactionService";
import modal from "./modal.module.css";

export const SendMoney = ({
    friendClick,
    setFriendClick,
    showModal,
    setShowModal,
}) => {
    const { userDataId, token } = useContext(AuthContext);
    const [receiver, setReceiver] = useState([]);
    const [userInput, setUserInput] = useState({ amount: "", friends: "" });

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
    };

    const onFormSubmitHandler = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const { amount, friends } = Object.fromEntries(form);
        if (!amount || !friends) {
            return;
        }

        const response = await transactions.send(
            friends,
            Number(amount),
            "+",
            userDataId,
            token
        );
        if (response.success) {
            await transactions.notify(
                friends,
                Number(amount),
                userDataId,
                token
            );
            setShowModal({ ...showModal, [`send`]: true });
            alert("Успешно изпратихте парите");
        } else {
            console.log(response);
        }
    };

    return (
        <div className={modal.modalBackground}>
            <div className={modal.modalContainer}>
                <div className={modal.modalHeader}>
                    <h5 className="modal-title">Изпращане на пари</h5>
                    <button
                        onClick={() => {
                            setShowModal({ ...showModal, [`send`]: false });
                            setFriendClick(null);
                        }}
                    >
                        X
                    </button>
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
                                friendClick={friendClick}
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
