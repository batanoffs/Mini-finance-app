import { useContext, useState } from 'react';
import { Empty } from 'antd';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { AuthContext } from '../../../../contexts/AuthContext';
import { useMessage } from '../../../../hooks';
import { FormInput } from '../../../../components/inputs';
import { getUserToken } from '../../../../utils';
import { FriendItem } from './FriendItem';

import styles from './friends.module.css';

export const Friends = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const [filteredFriends, setFilteredFriends] = useState(auth.friends);
    const [search, setSearch] = useState('');
    const { token } = getUserToken();
    const showMessage = useMessage();

    const onSearch = (e) => {
        const value = e.target.value;
        setSearch(value);

        if (value === '') {
            setFilteredFriends(auth.friends);
        } else {
            const filteredList = auth.friends.filter((friend) => {
                return friend.fullName.toLowerCase().includes(value.toLowerCase());
            });
            setFilteredFriends(filteredList);
        }
    };

    return (
        <div className={`${styles.customBlock} ${styles.customBlockProfile}`}>
            <h5>Friends</h5>
            <div className={styles.searchWrapper}>
                <FontAwesomeIcon className={styles.searchIcon} icon={faSearch} />
                <FormInput
                    className={styles.searchInput}
                    placeholder="Search friend"
                    id="Search friend"
                    type={'text'}
                    autoComplete="off"
                    onChange={onSearch}
                    value={search}
                />
            </div>
            <ul className={styles.friendsList}>
                {filteredFriends.length === 0 && (
                    <Empty
                        style={{ margin: '1em auto' }}
                        description="No results found. Add friends to find them here."
                    />
                )}
                {filteredFriends.length > 0 && (
                    <FriendItem
                        token={token}
                        setAuth={setAuth}
                        auth={auth}
                        showMessage={showMessage}
                        filteredFriends={filteredFriends}
                    />
                )}
            </ul>
        </div>
    );
};
