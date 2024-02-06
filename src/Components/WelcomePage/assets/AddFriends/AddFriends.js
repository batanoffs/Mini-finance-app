export const AddFriends = () => {
    return (
        <div className="custom-block custom-block-contact">
            <header>
                <h5>Добави приятел</h5>
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
