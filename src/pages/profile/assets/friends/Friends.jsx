import { Empty } from 'antd';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
                <FontAwesomeIcon className={styles.searchIcon} icon={faSearch} />
                <FormInput
                    className={styles.searchInput}
                    placeholder="Search friend"
                    id="Search friend"
                    type="text"
                    autoComplete="off"
                    onChange={onSearch}
                    value={search}
                />
            </div>
            <ul className={styles.friendsList}>
                {friends?.length === 0 ? (
                    <Empty
                        className={styles.empty}
                        description="No results found. Add friends to find them here."
                    />
                ) : (
                    <FriendItem friends={friends} onRemoveFriend={onRemoveFriend} />
                )}
            </ul>
        </div>
    );
};
