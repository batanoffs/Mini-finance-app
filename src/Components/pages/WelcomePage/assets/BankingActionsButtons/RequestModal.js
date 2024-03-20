import { dataService } from "../../../../../services/userDataService";
import { AuthContext } from "../../../../../contexts/AuthContext";
import { useState, useContext, useEffect } from "react";
import { Autocomplete } from "../../../../features/Autocomplate";
import { App } from "antd";

import modal from "./modal.module.css";

export const RequestMoney = ({ showModal, setShowModal }) => {
    const { userDataId } = useContext(AuthContext);
    const [userInput, setUserInput] = useState(""); // Add state to track selected friend
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
                            "name": friend.fullName,
                            "avatar": friend.avatar
                        };
                    } else {
                        return null;
                    }
                })
            );
        });
    }, [userDataId, setReceiver]);

    const clearHandler = (e) => {
        e.target.value = "";
    };
    
    return (
        <div className={modal.modalBackground}>
            <div className={modal.modalContainer}>
                <div className={modal.modalHeader}>
                    <h5 className="modal-title">Поискай пари</h5>
                    <button onClick={() => setShowModal({ ...showModal, [`receive`]: false })}>x</button>
                </div>
                <form className="custom-form">
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
                        <div className="form-group ">
                            <label htmlFor="friends">Приятел</label>
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
    );
};
