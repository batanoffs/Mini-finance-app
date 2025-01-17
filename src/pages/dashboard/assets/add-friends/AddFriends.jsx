import { EmptyCard } from '../../../../components/cards';
import { FormInput } from '../../../../components/inputs';
import { useAddFriend } from '../../../../hooks';

import styles from './add-friends.module.css';

export const AddFriends = () => {
    // TODO - move the useAddFriend handlers to useForm hook in order to reuse it and apply error handling
    const [onSubmit, onFocusClearErrorHandler, onChangeNumber, number, error] =
        useAddFriend();

    return (
        <EmptyCard title="Add Friend via phone" color="primary">
            <form onSubmit={onSubmit} className={styles.friendsForm}>
                <FormInput
                    type="number"
                    id="phone number"
                    placeholder="phone number"
                    required
                    value={number}
                    onChange={onChangeNumber}
                    onFocus={onFocusClearErrorHandler}
                />

                <FormInput type="submit" className="custom-btn" value="Add" />
            </form>
        </EmptyCard>
    );
};
