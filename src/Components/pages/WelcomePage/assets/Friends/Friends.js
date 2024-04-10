import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useState } from 'react'
import { Empty, Input } from 'antd'

import { Friend } from './assets/FriendEntry'
import { AuthContext } from '../../../../../contexts/AuthContext'
import { useMessage } from '../../../../../hooks/useMessage'

import blocks from '../../custom-block.module.css'
import styles from './friends.module.css'

export const Friends = () => {
    const { userDataId, token, auth, setAuth } = useContext(AuthContext)
    const [filteredFriends, setFilteredFriends] = useState(auth.friends)
    const [search, setSearch] = useState('')
    const showMessage = useMessage()

    const onSearch = (e) => {
        const value = e.target.value
        setSearch(value)

        if (value === '') {
            setFilteredFriends(auth.friends)
        } else {
            const filteredList = auth.friends.filter((friend) => {
                return friend.fullName.toLowerCase().includes(value.toLowerCase())
            })
            setFilteredFriends(filteredList)
        }
    }
    return (
        <div className={`${blocks.customBlock} ${blocks.customBlockProfile}`}>
            <h5>Приятели</h5>
            <div className={styles.searchWrapper}>
                <FontAwesomeIcon className={styles.searchIcon} icon={faSearch} />
                <Input
                    className={styles.searchInput}
                    placeholder="Търси приятел"
                    onChange={onSearch}
                    value={search}
                />
            </div>
            <ul className={styles.friendsList}>
                {filteredFriends.length === 0 && (
                    <Empty
                        style={{
                            margin: '1em auto',
                            fontFamily: 'var(--body-font-family)',
                        }}
                        description="Няма резултати"
                    />
                )}
                {filteredFriends.length > 0 && (
                    <Friend
                        userDataId={userDataId}
                        token={token}
                        setAuth={setAuth}
                        auth={auth}
                        showMessage={showMessage}
                        friends={filteredFriends}
                    />
                )}
            </ul>
        </div>
    )
}
