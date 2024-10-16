import { useState, useContext } from 'react'

import { notificationService } from '../../../../services/notificationService'
import { dataService } from '../../../../services/userDataService'
import { AuthContext } from '../../../../contexts/AuthContext'
import { useMessage } from '../../../../hooks/useMessage'

import blocks from '../custom-block.module.css'
import styles from './addfriends.module.css'

export const AddFriends = () => {
    const [number, setNumber] = useState('')
    const [error, setError] = useState(false)
    const { userDataId, token, phone, friends } = useContext(AuthContext)
    const showMessage = useMessage()

    const onChangeNumber = (e) => {
        setNumber(e.target.value)
    }

    const onFocusClearErrorHandler = (e) => {
        e.target.style.border = `1px solid var(--primary-hover-color)`
        setError(false)
    }
    const onSubmit = async (event) => {
        event.preventDefault()
        try {
            if (!number) {
                throw new Error('Липсва телефонен номер')
            }
            if (number === phone) {
                throw new Error('Не може да добавяте себе си')
            }

            const findReceiver = await dataService.getAttribute('phoneNumber', number)
            if (!findReceiver || findReceiver.length === 0) {
                throw new Error('Потребителят с този телефонен номер не съществува')
            }

            const receiver = findReceiver[0].objectId
            const findFriend = friends?.some((friend) => friend.objectId === receiver)

            if (findFriend) {
                throw new Error('Потребителят вече е ваш приятел')
            }
            // GET NOTIFICATIONS AND FILTER FOR SENDER RECEIVER
            const allFriendRequestNotifications = await notificationService.getAllFriendRequests(
                token
            )
            if (!allFriendRequestNotifications) {
                throw new Error('Failed to fetch friend request notifications')
            }
            const checkFriendNotification = allFriendRequestNotifications.filter(
                (request) =>
                    (request.receiver?.length &&
                        request.receiver[0].objectId === receiver &&
                        request.sender[0].objectId === userDataId) ||
                    (request.receiver?.length &&
                        request.receiver[0].objectId === userDataId &&
                        request.sender[0].objectId === receiver)
            )
            //CHECK IF NOTIFICATION EXIST
            if (checkFriendNotification.length === 0) {
                const response = await notificationService.createNotification(
                    number,
                    null,
                    'friend request',
                    userDataId,
                    token
                )

                if (!response || !response.success) {
                    throw new Error('Failed to send friend request')
                }
                showMessage('success', 'Поканата за приятелство е изпратена')
            } else {
                const senderID = checkFriendNotification[0]?.sender[0]?.objectId
                const receiverID = checkFriendNotification[0]?.receiver[0]?.objectId
                const notificatinID = checkFriendNotification[0].objectId
                const status = checkFriendNotification[0]?.status

                if (status === 'pending') new Error('Вече сте направили заявка за приятелство')
                if (status === 'accepted') new Error('Вие сте приятел')
                if (status === 'declined') {
                    // CHECK IF FILTERED NOTIFICATION SENDER's ID IS CURRENT USER ID OR NOT
                    // UPDATE RALATIONS to flip the friend request to the other user
                    if (receiverID === userDataId) {
                        const setSenderResponse = await notificationService.updateRelation(
                            notificatinID,
                            'sender',
                            receiverID,
                            token
                        )
                        const setReceiverResponse = await notificationService.updateRelation(
                            notificatinID,
                            'receiver',
                            senderID,
                            token
                        )

                        console.log('setSenderResponse', setSenderResponse)
                        console.log('setReceiverResponse', setReceiverResponse)

                        if (
                            !setSenderResponse ||
                            !setReceiverResponse ||
                            setSenderResponse === 0 ||
                            setReceiverResponse === 0
                        ) {
                            throw new Error('Failed to update relation')
                        }
                        const response = await notificationService.updateNotificationStatus(
                            notificatinID,
                            'pending',
                            false,
                            token
                        )
                        if (!response) {
                            throw new Error('Грешка при приемането на заявката')
                        }
                        showMessage('success', 'Поканата за приятелство е изпратена')
                    }

                    // ELSE ONLY CHANGE THE STATUS FOR SEEN AND STATUS TO PENDING
                    if (senderID === userDataId) {
                        const response = await notificationService.updateNotificationStatus(
                            notificatinID,
                            'pending',
                            false,
                            token
                        )
                        if (!response || !response.success) {
                            throw new Error('Грешка при приемането на заявката')
                        }
                        showMessage('success', 'Поканата за приятелство е изпратена')
                    }
                }
            }
        } catch (error) {
            console.error(error)
            showMessage('error', error.message)
        }
        setNumber('')
    }

    return (
        <div className={`${blocks.customBlockContact}`}>
            <header>
                <h5>Добави приятел</h5>
            </header>
            <form onSubmit={onSubmit} className={styles.friendsForm}>
                {error ? <small style={{ color: 'red' }}>липсва телефонен номер</small> : null}
                <input
                    type="text"
                    placeholder="телефон"
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
                <input type="submit" className="custom-btn" value="Добави" />
            </form>
        </div>
    )
}
