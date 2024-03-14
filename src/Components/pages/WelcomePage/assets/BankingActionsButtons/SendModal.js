import { dataService } from "../../../../../services/userDataService";
import { AuthContext } from "../../../../../contexts/AuthContext";
import { useState, useContext, useEffect } from "react";
import { Autocomplete } from "../../../../features/Autocomplate";
import { transactions } from "../../../../../services/transactionService";
import { Button, Space, App } from "antd";
import modal from "./modal.module.css";

export const SendMoney = ({userInput, setUserInput, showModal, setShowModal}) => {
    const { userDataId, token } = useContext(AuthContext);
    const [receiver, setReceiver] = useState([]);
    const { message } = App.useApp();

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
    }, [userDataId, setReceiver]);
   
    const showMessage = (type, text) => {
        type === "error" ? message.error(text) :
        type === "success" ? message.success(text) :
        type === "warning" ? message.warning(text) :
        type === "info" ? message.info(text) :
        message(text);
    };

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
            setShowModal({ ...showModal, [`send`]: false });
            setUserInput({ amount: "", friends: "" });
            showMessage("success", "Успешно изпратихте парите");

        } else {
            setShowModal({ ...showModal, [`send`]: false });
            setUserInput({ amount: "", friends: "" });
            showMessage("error", `Грешка при изпращане: ${response.message}`);
            console.log("error", response);
        }
    };

    const onClose = () => {
        setShowModal({ ...showModal, [`send`]: false });
        setUserInput({ amount: "", friends: "" });
    };

    return (
        <div className={modal.modalBackground}>
            <div className={modal.modalContainer}>
                <div className={modal.modalHeader}>
                    <h5 className="modal-title">Изпращане на пари</h5>
                    <button onClick={onClose}>X</button>
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
                            <Space style={{ margin: "0 auto" }}>
                                <Button
                                    type="primary"
                                    className="button-primary"
                                    style={{
                                        fontFamily: "var(--body-font-family)",
                                    }}
                                    onClick={onFormSubmitHandler}
                                >
                                    Изпрати
                                </Button>
                            </Space>
                        </footer>
                    </form>
                </div>
            </div>
        </div>
    );
};
