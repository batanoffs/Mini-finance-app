import { useState, useContext } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";
import { dataService } from "../../../../services/userDataService";

export const AddFriends = () => {
    const [number, setNumber] = useState('');
    const { userDataId } = useContext(AuthContext);
    const onChangeNumber = (e) => {
        setNumber(e.target.value);
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(userDataId);
        const checkPhone = await dataService.getAttribute(`phoneNumber`, number);
        if (checkPhone) {
            const frindId = checkPhone[0].objectId;
            const response = await dataService.setRelation(userDataId, "friends", [frindId]);
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
                <input
                    type="text"
                    placeholder="телефон"
                    required=""
                    value={number}
                    onChange={onChangeNumber}
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
