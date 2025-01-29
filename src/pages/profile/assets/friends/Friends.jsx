import { Empty } from 'antd';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

import { FormInput } from '../../../../components/inputs';
import { FriendItem } from './FriendItem';
import { useFriends } from './useFriend';

import styles from './friends.module.css';

export const Friends = () => {
    const { friends, search, onSearch, onRemoveFriend } = useFriends();

    return (
        <div className={`${styles.customBlock} ${styles.customBlockProfile}`}>
            <h5>Friends</h5>
            <div className={styles.searchWrapper}>
                <FontAwesomeIcon className={styles.searchIcon} icon={faSearch} aria-hidden="true" />
                <FormInput
                    className={styles.searchInput}
                    placeholder="Search friend"
                    id="friend-search"
                    type="text"
                    autoComplete="off"
                    onChange={onSearch}
                    value={search}
                    aria-label="Search friends"
                />
            </div>
            <ul className={styles.friendsList} role="list">
                {friends && friends.length > 0 ? (
                    friends.map((friend) => (
                        <FriendItem 
                            key={friend.objectId}
                            friend={friend} 
                            onRemoveFriend={onRemoveFriend}
                        />
                    ))
                ) : (
                    <Empty
                        className={styles.empty}
                        description="No results found. Add friends to find them here."
                    />
                )}
            </ul>
        </div>
    );
};

Friends.propTypes = {
    friends: PropTypes.arrayOf(
        PropTypes.shape({
            objectId: PropTypes.string.isRequired,
            fullName: PropTypes.string.isRequired,
            avatar: PropTypes.string,
            country: PropTypes.string,
            phoneNumber: PropTypes.string
        })
    ),
    search: PropTypes.string,
    onSearch: PropTypes.func.isRequired,
    onRemoveFriend: PropTypes.func.isRequired
};
