import { useState, useContext } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";
import { dataService } from "../../../../services/userDataService";

export const AddFriends = () => {
    const [number, setNumber] = useState('');
    const [error, setError] = useState(false);
    const { userDataId } = useContext(AuthContext);
    const onChangeNumber = (e) => {
        setNumber(e.target.value);
    }

    const onFocusClearErrorHandler = (e) => {
        setError(false);
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(userDataId);
        if( !number ) {
            setError(true);
            return;
        }
        const checkPhone = await dataService.getAttribute(`phoneNumber`, number);
        if (checkPhone[0]) {
            const friendId = checkPhone[0].objectId;
            const response = await dataService.setRelation(userDataId, "friends", [friendId]);
            if (response === 1) {
                window.alert("Успешно добавихте приятел");
            } else {
                window.alert("Вече сте добавили този приятел");
            }
        } else {
            window.alert("Няма такъв потребител");
        }
        setNumber("");
    }
    return (
        <div className="custom-block custom-block-contact">
            <header>
                <h5>Добави приятел</h5>
            </header>
            <form onSubmit={onSubmit} className="add-friends-form">
                { error ? <small style={{color: "red"}}>липсва телефонен номер</small> : null }
                <input
                    type="text"
                    placeholder="телефон"
                    required=""
                    value={number}
                    onChange={onChangeNumber}
                    onFocus={onFocusClearErrorHandler}
                />
                <input
                    type="submit"
                    className="custom-btn"
                    value="Добави"
                />
            </form>
        </div>
    );
};
