import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';

import { EmptyCard } from '../../../../components/cards';
import { FormInput } from '../../../../components/inputs';
import { useAddFriend, useMessage } from '../../../../hooks';

import styles from './add-friends.module.css';
import 'react-phone-number-input/style.css';

export const AddFriends = () => {
    const showMessage = useMessage();
    const { onFriendRequest, value, changeHandler } = useAddFriend();

    const onSubmit = (e) => {
        e.preventDefault();

        if (!value) {
            showMessage('error', 'Please enter a phone number');
            return;
        }

        if (!isPossiblePhoneNumber(value)) {
            showMessage('error', 'Please enter a valid phone number');
            return;
        }

        onFriendRequest();
    };

    return (
        <EmptyCard title="Add friend" color="primary">
            <form onSubmit={onSubmit} className={styles.friendsForm}>
                <PhoneInput
                    placeholder="Enter phone number"
                    defaultCountry="BG"
                    value={value}
                    onChange={changeHandler}
                    international={true}
                    countryCallingCodeEditable={false}
                    style={{
                        marginBottom: '0.5em',
                    }}
                />
                <FormInput type="submit" value="Add" sx={{ marginBottom: '0' }} />
            </form>
        </EmptyCard>
    );
};
