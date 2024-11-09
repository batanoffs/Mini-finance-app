import { useAddFriend } from '../../../../../../hooks'

import styles from './add-friends.module.css'

export const AddFriends = () => {
    const [onSubmit, onFocusClearErrorHandler, onChangeNumber, number, error] = useAddFriend()

    return (
        <div className={styles.customBlockContact}>
            <header>
                <h5>Add Friend via phone</h5>
            </header>
            <form onSubmit={onSubmit} className={styles.friendsForm}>
                {error ? <small style={{ color: 'red' }}>No phone number</small> : null}
                <input
                    type="number"
                    id="phone number"
                    name="phone number"
                    placeholder="phone number"
                    onBlur={(e) => {
                        if (!number) {
                            e.target.style.border = `1px solid transparent`
                        }
                    }}
                    required
                    value={number}
                    onChange={onChangeNumber}
                    onFocus={onFocusClearErrorHandler}
                />
                <input type="submit" className="custom-btn" value="Add" />
            </form>
        </div>
    )
}
