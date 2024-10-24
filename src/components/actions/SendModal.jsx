import { useState, useContext, useEffect, useCallback } from 'react'

import { transactionService } from '../../services/transactionService'
import { AuthContext } from '../../contexts/AuthContext'
import { Autocomplete } from '../autocomplete/Autocomplete'
import { useMessage } from '../../hooks/useMessage'
import { dataService } from '../../services/userDataService'

import modal from './modal.module.css'

export const SendMoney = ({ userInput, setUserInput, showModal, setShowModal }) => {
    const { userDataId, token } = useContext(AuthContext)
    const [receiver, setReceiver] = useState([])
    const showMessage = useMessage()

    const getReceivers = useCallback(async () => {
        try {
            const response = await dataService.getRelation(userDataId, 'friends')
            const friends = response.friends?.map((friend) => {
                if (friend.fullName) {
                    return {
                        name: friend.fullName,
                        avatar: friend.avatar,
                        objectId: friend.objectId,
                    }
                } else {
                    return null
                }
            })
            setReceiver(friends)
        } catch (error) {
            showMessage('error', 'Error during fetching friends')
        }
    }, [])

    useEffect(() => {
        getReceivers()
    }, [getReceivers])

    const setUserInputHandler = (e) => {
        if (!e || !e.target) {
            throw new Error('Null pointer exception: e.target is null')
        }
        const { name, value } = e.target
        if (!name) {
            throw new Error('Null pointer exception: e.target.name is null')
        }
        setUserInput({ ...userInput, [name]: value })
    }

    const onFormSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            if (!e.target) {
                throw new Error('Target element does not exist.')
            }
            const formElementSelect = e.target
            const form = new FormData(formElementSelect)
            const { amount, friends } = Object.fromEntries(form)
            if (!amount || !friends) {
                throw new Error('Amount or friends are not given.')
            }

            const response = await transactionService.sendMoney(
                friends,
                Number(amount),
                userDataId,
                token
            )
            if (!response) {
                throw new Error('Transaction service response is null.')
            }
            if (!response.success) {
                throw new Error(`Transaction service error: ${response.message}`)
            }
            await transactionService.notifyMoneyReceived(friends, Number(amount), userDataId, token)
            setShowModal({ ...showModal, [`send`]: false })
            setUserInput({ amount: '', friends: '' })
            showMessage('success', 'Successfully sent the money')
        } catch (error) {
            console.log('Error in onFormSubmitHandler: ', error)
            setShowModal({ ...showModal, [`send`]: false })
            setUserInput({ amount: '', friends: '' })
            showMessage('error', `Error sending money: ${error.message}`)
        }
    }

    const onClose = () => {
        if (!showModal) {
            console.error('showModal is null')
            return
        }
        if (!showModal['send']) {
            console.error('showModal.send is null')
            return
        }
        setShowModal({ ...showModal, [`send`]: false })

        if (!userInput) {
            console.error('userInput is null')
            return
        }
        setUserInput({ amount: '', friends: '' })
    }

    return (
        <div className={modal.modalBackground}>
            <div className={modal.modalContainer}>
                <div className={modal.modalHeader}>
                    <h5 className="modal-title">Send Money</h5>
                    <button onClick={onClose}>X</button>
                </div>
                <div className="form-content">
                    <form onSubmit={onFormSubmitHandler}>
                        <div className="form-group">
                            <label htmlFor="amount">Amount:</label>
                            <input
                                type="text"
                                name="amount"
                                id="amount"
                                className="form-control"
                                placeholder="10$"
                                value={userInput.amount}
                                onChange={setUserInputHandler}
                            />
                        </div>
                        <div className="form-group ">
                            <label htmlFor="friends">Friend:</label>
                            <Autocomplete
                                name="friends"
                                userInput={userInput}
                                setUserInput={setUserInput}
                                suggestions={[...receiver]}
                            />
                        </div>

                        <footer>
                            <input
                                className="button-primary"
                                type="submit"
                                value="Send"
                                style={{ width: '100%' }}
                            />
                        </footer>
                    </form>
                </div>
            </div>
        </div>
    )
}
