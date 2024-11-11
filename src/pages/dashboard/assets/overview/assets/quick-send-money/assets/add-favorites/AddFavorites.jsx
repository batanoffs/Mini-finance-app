import { useContext, useState } from 'react'

import { AuthContext } from '../../../../../../../../contexts/AuthContext'
import { dataService } from '../../../../../../../../services'
import { useMessage } from '../../../../../../../../hooks'
import { Autocomplete } from '../../../../../../../../components/inputs'

import styles from './add-friends.module.css'

// TODO A component is changing an uncontrolled input to be controlled.
// This is likely caused by the value changing from undefined to a defined value,
// which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component.
export const AddToFavorites = ({ toggleModal }) => {
    const { auth, setAuth, token, userDataId } = useContext(AuthContext)
    const [userInput, setUserInput] = useState({})
    const showMessage = useMessage()

    const onSubmit = async (event) => {
        event.preventDefault()
        const inputName = userInput.friends

        try {
            const findFriend = auth.friends.filter((friend) => friend.fullName === inputName)
            const body = [findFriend[0].objectId]

            if (!findFriend) throw new Error('This user is not your friend!')
            if (!findFriend.length) throw new Error('This user is not your friend!')
            if (!userInput) throw new Error('Please enter a name!')
            if (!userDataId) throw new Error('Something went wrong')

            const response = await dataService.setRelation(userDataId, 'favorite_friends', body, token)

            if (response !== 1) {
                toggleModal('favFriends')
                throw new Error('Something went wrong!')
            }

            if (response === 1) {
                setAuth({ ...auth, favorite_friends: [...auth.favorite_friends, findFriend[0]] })
                sessionStorage.setItem(
                    'auth',
                    JSON.stringify({
                        ...auth,
                        favorite_friends: [...auth.favorite_friends, findFriend[0]],
                    })
                )
                toggleModal('favFriends')
                showMessage('success', `${findFriend[0].fullName} has been added to favorites!`)
            }
        } catch (error) {
            showMessage('error', error.message)
            console.error(error)
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <Autocomplete
                name="favorite-name"
                id="favorite-name"
                userInput={userInput}
                setUserInput={setUserInput}
                suggestions={[
                    ...auth.friends.map((friend) => {
                        return {
                            name: friend.fullName,
                            avatar: friend.avatar,
                            objectId: friend.objectId,
                        }
                    }),
                ]}
            />
            <input className={`"custom-btn-fill" ${styles.button}`} type="submit" value="Add to favorites" />
        </form>
    )
}
