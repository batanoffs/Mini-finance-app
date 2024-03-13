import { useState, useContext } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";
import { notifications } from "../../../../services/notificationService";
import blocks from "../custom-block.module.css";
import styles from "./addfriends.module.css";

export const AddFriends = () => {
    const [number, setNumber] = useState("");
    const [error, setError] = useState(false);
    const { userDataId, token } = useContext(AuthContext);

    const onChangeNumber = (e) => {
        setNumber(e.target.value);
    };

    const onFocusClearErrorHandler = (e) => {
        e.target.style.border = `1px solid var(--primary-hover-color)`;

        setError(false);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!number) {
            setError(true);
            return;
        }
        const response = await notifications.createNotification(
            number,
            null,
            "friend request",
            userDataId,
            token
        );

        if (response.success) {
            window.alert("Успешно изпратихте покана за приятелство");
        } else {
            window.alert("Няма такъв потребител");
        }
        setNumber("");
    };
    return (
        <div className={`${blocks.customBlockContact}`}>
            <header>
                <h5>Добави приятел</h5>
            </header>
            <form onSubmit={onSubmit} className={styles.friendsForm}>
                {error ? (
                    <small style={{ color: "red" }}>
                        липсва телефонен номер
                    </small>
                ) : null}
                <input
                    type="text"
                    placeholder="телефон"
                    onBlur={(e) => {
                        if (!number) {
                            e.target.style.border = `1px solid transparent`;
                        }
                    }}
                    required
                    value={number}
                    onChange={onChangeNumber}
                    onFocus={onFocusClearErrorHandler}
                />
                <input type="submit" className="custom-btn" value="Добави" />
            </form>
        </div>
    );
};
