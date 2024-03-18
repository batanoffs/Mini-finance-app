import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../../../contexts/AuthContext";
import { dataService } from "../../../../../services/userDataService";
import { App } from 'antd';

export const AddToFavorites = ({ showFavourites, setShowFavourites }) => {
    const { userDataId, auth, setAuth, token } = useContext(AuthContext);
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
        const form = new FormData(event.target);
        const friendName = form.get("favorite-name");
        const body = { name: friendName };
        const findFriend = auth.friends.filter((friend) => friend.fullName === friendName);
        try {
            if (!userDataId) {
                console.error("userDataId is null", userDataId);
                return;
            }

             await dataService.attribute("fullName", friendName);
            await dataService.setRelation(findFriend, "favourites", body);
        } catch (error) {
            showMessage("error", error.message);
        }

        setShowFavourites(false);
    };

    return (
            <div className="modal-backdrop">
                <div className="popup-modal">
                    <form onSubmit={onSubmit}>
                        <label htmlFor="favorite-name">Въведи име:</label>
                        <input type="text" name="favorite-name" id="favorite-name" />
                        <br />
                        <input type="submit" value="Добави към любими" />
                    </form>
                </div>
            </div>
    );
};
