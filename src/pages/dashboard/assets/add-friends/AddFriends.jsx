import { EmptyCard } from '../../../../components/cards';
import { FormInput } from '../../../../components/inputs';
import { useAddFriend, useForm } from '../../../../hooks';

import styles from './add-friends.module.css';

export const AddFriends = () => {
    const { onFriendRequest } = useAddFriend();
    const { values, error, changeHandler, validateHandler, onFocusHandler, handleSubmit } = useForm(
        { phone: '' },
        { phone: 'Phone is not valid' },
        { phone: /^\d{10}$/ }
    );

    const onSubmit = (formData) => {
        onFriendRequest(formData);
    };

    return (
        <EmptyCard title="Add Friend via phone" color="primary">
            <form onSubmit={handleSubmit(onSubmit)} className={styles.friendsForm}>
                <FormInput
                    type="tel"
                    name="phone"
                    id="phone"
                    placeholder="phone number"
                    value={values.phone}
                    error={error.phone}
                    onChange={changeHandler}
                    onBlur={validateHandler}
                    onFocus={onFocusHandler}
                    required
                />

                <FormInput type="submit" value="Add" sx={{ marginBottom: '0' }} />
            </form>
        </EmptyCard>
    );
};
