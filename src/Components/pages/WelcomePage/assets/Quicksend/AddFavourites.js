import { useState, useContext } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";
import { dataService } from "../../../../../services/userDataService";
import { showMessage } from "../../../../services/notificationService";


export const AddToFavorites = ({ showFavourites, setShowFavourites }) => {
    const { userDataId, token } = useContext(AuthContext);
    const [favourites, setFavourites] = useState([]);


    const onSubmit = async (event) => {
        event.preventDefault();
        const form = new FormData(event.target);
        const friendName = form.get("favorite-name");
        const body = { name: friendName };

        try {
            const response = await dataService.attribute("fullName", friendName);
            await dataService.setRelation(response, "favourites", body);
            setFavourites([...favourites, friendName]);
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
