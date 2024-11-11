import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import { AuthContext } from '../../../../../../../../contexts/AuthContext'
import { dataService } from '../../../../../../../../services'
import { useMessage } from '../../../../../../../../hooks'

import styles from './actions.module.css'

export const Actions = ({ friend, toggleModal }) => {
    const { favorites, auth, setAuth, userDataId, token } = useContext(AuthContext)
    const showMessage = useMessage()

    const showActionsHandler = (e) => {
        const tooltip = e.currentTarget.nextElementSibling
        tooltip.style.display = tooltip.style.display === 'block' ? 'none' : 'block'
    }

    const closeMenuHandler = (e) => {
        e.currentTarget.style.display = e.currentTarget.style.display === 'block' ? 'none' : 'block'
    }

    const onConfirmHandler = (e) => {
        try {
            if (!e) throw new Error('Null pointer exception: e is null')
            const target = e.currentTarget

            if (!target) throw new Error('Null pointer exception: target is null')

            const friendId = target.getAttribute('data-key')

            if (!friendId) throw new Error('Null pointer exception: friendId is null')
            dataService
                .removeRelation(userDataId, 'favorite_friends', friendId, token)
                .then(() => {
                    showMessage('success', 'Successfully removed friend from list')
                    setAuth({
                        ...auth,
                        favorite_friends: favorites.filter((favorite) => favorite.objectId !== friendId),
                    })
                    toggleModal('buttons')
                })
                .catch((error) => {
                    console.error(error)
                    showMessage('error', error.message)
                })
        } catch (error) {
            console.error(error)
            showMessage('error', `An error occurred: ${error.message}`)
        }
    }
    return (
        <>
            <FontAwesomeIcon className={styles.deleteIconBtn} icon={faTimes} onClick={showActionsHandler} />
            <div className={styles.actionButtons} onMouseOut={closeMenuHandler}>
                <ul>
                    <li className={styles.actionButton} data-key={friend.objectId} onClick={onConfirmHandler}>
                        Delete
                    </li>
                </ul>
            </div>
        </>
    )
}
