import { dataService } from "../../../../../services/userDataService";
import { AuthContext } from "../../../../../contexts/AuthContext";
import { useState, useContext, useEffect } from "react";
import { Autocomplete } from "../../../../features/Autocomplate";
import { transactions } from "../../../../../services/transactionService";

import { App } from "antd";

import modal from "./modal.module.css";

export const RequestMoney = ({userInput, setUserInput, showModal, setShowModal}) => {
    const { userDataId, token } = useContext(AuthContext);
    const [receiver, setReceiver] = useState([]);
    const { message } = App.useApp();

    const showMessage = (type, text) => {
        type === "error" ? message.error(text) :
        type === "success" ? message.success(text) :
        type === "warning" ? message.warning(text) :
        type === "info" ? message.info(text) :
        message(text);
    };

    useEffect(() => {
        dataService.getRelation(userDataId, "friends").then((response) => {
            setReceiver(
                response.friends.map((friend) => {
                    if (friend.fullName) {
                        return {
                            name: friend.fullName,
                            avatar: friend.avatar,
                            objectId: friend.objectId,
                        };
                    } else {
                        return null;
                    }
                })
            );
        });
    }, [userDataId, setReceiver]);

    const setUserInputHandler = (e) => {
        setUserInput({ ...userInput, [e.target.name]: e.target.value });
    };

    const onFormSubmitHandler = async (e) => {
        e.preventDefault();
        const formElementSelect =
            e.target.parentElement.parentElement.parentElement.parentElement
                .parentElement;
        const form = new FormData(formElementSelect);
        const { amount, friends } = Object.fromEntries(form);
        if (!amount || !friends) {
            return;
        }

        const response = await transactions.request(
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
            setShowModal({ ...showModal, [`request`]: false });
            setUserInput({ amount: "", friends: "" });
            showMessage("success", "Успешно поискахте парите");

        } else {
            setShowModal({ ...showModal, [`request`]: false });
            setUserInput({ amount: "", friends: "" });
            showMessage("error", `Грешка при изпращане: ${response.message}`);
            console.log("error", response);
        }
    };

    const onClose = () => {
        setShowModal({ ...showModal, [`request`]: false });
        setUserInput({ amount: "", friends: "" });
    };

    return (
        <div className={modal.modalBackground}>
            <div className={modal.modalContainer}>
                <div className={modal.modalHeader}>
                    <h5 className="modal-title">Поискай пари</h5>
                    <button onClick={onClose}>x</button>
                </div>
                <div className="form-content">
                    <form onSubmit={onFormSubmitHandler} className="custom-form">
                        <div className="form-group">
                            <label htmlFor="amount">Сума:</label>
                            <input
                                type="text"
                                name="amount"
                                id="amount"
                                value={userInput.amount}
                                onChange={setUserInputHandler}
                                className="form-control"
                                placeholder="10лв"
                            />
                        </div>
                        <div className="form-group">
                            <div className="form-group ">
                                <label htmlFor="friends">Приятел:</label>
                                <Autocomplete
                                    name="friends"
                                    userInput={userInput}
                                    setUserInput={setUserInput}
                                    suggestions={[...receiver]}
                                />
                            </div>
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
