import { useContext, useState } from "react";
import { AuthContext } from "../../../../../contexts/AuthContext";
import { dataService } from "../../../../../services/userDataService";
import { Autocomplete } from "../../../../features/Autocomplate";
import { App } from 'antd';

export const AddToFavorites = ({ setShowFavourites }) => {
    const { auth, setAuth, token, userDataId } = useContext(AuthContext);
    const [ userInput, setUserInput ] = useState("");
    const { message } = App.useApp();
        
    const showMessage = (type, text) => {
        type === "error" ? message.error(text) :
        type === "success" ? message.success(text) :
        type === "warning" ? message.warning(text) :
        type === "info" ? message.info(text) :
        message(text);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        const inputName = userInput.friends;
        

        try {
            const findFriend = auth.friends.filter((friend) => friend.fullName === inputName);
            if(!findFriend) throw new Error("Този потребител не е ваш приятел!");
            if(!findFriend.length) throw new Error("Този потребител не е ваш приятел!");

            console.log(findFriend);
            console.log(inputName);
            const body = [findFriend[0].objectId];
            if(!userInput) throw new Error("Моля въведете име!");
            if(!userDataId) throw new Error("Нещо се обърка");

            const response = await dataService.setRelation(userDataId, "favorite_friends", body, token);

            if (response !== 1) {
                setShowFavourites(false);
                throw new Error("Нещо се обърка!");
                
            }

            if (response === 1) {
                setAuth({ ...auth, favorite_friends: [...auth.favorite_friends, findFriend[0]] });
                sessionStorage.setItem("auth", JSON.stringify({ ...auth, favorite_friends: [...auth.favorite_friends, findFriend[0]] }));
                setShowFavourites(false);
                showMessage("success", `${findFriend[0].fullName} е добавен към любими!`);
            }
        } catch (error) {
            showMessage("error", error.message);
            console.error(error);
        }
    };

    return (
            <div className="modal-backdrop">
                <div className="popup-modal">
                    <form onSubmit={onSubmit}>
                        <label htmlFor="favorite-name">Въведи име:</label>
                        <Autocomplete
                                name="favorite-name"
                                userInput={userInput}
                                setUserInput={setUserInput}
                                suggestions={[...auth.friends.map((friend) => friend.fullName)]}
                        />
                        <input type="submit" className="custom-btn" value="Добави към любими" />
                    </form>
                </div>
            </div>
    );
};
