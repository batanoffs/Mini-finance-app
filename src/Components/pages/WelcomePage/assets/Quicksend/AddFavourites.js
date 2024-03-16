import { useState } from "react";

export const AddToFavorites = ({ showFavourites, setShowFavourites }) => {

    const onSubmit = (e) => {
        console.log("submitted");
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