export const AddFriends = () => {
    return (
        <div className="custom-block custom-block-contact">
            <header>
                <h3>Добави приятел</h3>
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
