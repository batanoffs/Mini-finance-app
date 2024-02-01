import "./addfriends.css";

export const AddFriends = () => {
    return (
        <div className="custom-block custom-block-contact">
            <header>
                <h6>Добави приятел</h6>
            </header>
            <form className="add-friends-form">
                <input
                    type="text"
                    placeholder="Въведи телефонен номер"
                    required=""
                />
                <input
                    type="submit"
                    className="btn custom-btn"
                    value="Добави"
                />
            </form>
        </div>
    );
};
