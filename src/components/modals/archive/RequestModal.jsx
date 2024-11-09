import { useState, useContext, useEffect, useCallback } from 'react'

import { transactionService } from '../../../services/transactionService'
import { dataService } from '../../../services/userDataService'
import { AuthContext } from '../../../contexts/AuthContext'
import { Autocomplete } from '../../autocomplete/Autocomplete'
import { useMessage } from '../../../hooks/useMessage'

import modal from './modal.module.css'

export const RequestMoney = ({ toggleModal }) => {
    const [userInput, setUserInput] = useState({ amount: '', friends: '' })
    const { userDataId, token } = useContext(AuthContext)
    const [receiver, setReceiver] = useState([])
    const showMessage = useMessage()

    const getRelations = useCallback(async () => {
        try {
            const response = await dataService.getRelation(userDataId, 'friends')
            const friends = response.friends.map((friend) => {
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
            showMessage('error', 'Error getting friends')
        }
    }, [userDataId])

    useEffect(() => {
        getRelations()
    }, [getRelations])

    const setUserInputHandler = (e) => {
        setUserInput({ ...userInput, [e.target.name]: e.target.value })
    }

    const onFormSubmitHandler = async (event) => {
        try {
            if (!event) throw new Error('Event is null')

            event.preventDefault()

            if (!event.target) throw new Error('Form element is null')

            const formElementSelect = event.target
            const form = new FormData(formElementSelect)

            if (!form) throw new Error('FormData is null')

            const formEntries = Object.fromEntries(form)
            const { amount, friends } = formEntries

            if (!amount || !friends) throw new Error('Amount or friends is null or empty')

            const response = await transactionService.requestNotify(friends, Number(amount), userDataId, token)

            if (!response) throw new Error('TransactionService response is null')

            if (response.success) {
                toggleModal('request')
                setUserInput({ amount: '', friends: '' })
                showMessage('success', 'Successfully requested money')
            } else {
                toggleModal('request')
                setUserInput({ amount: '', friends: '' })
                showMessage('error', `Error requesting money: ${response.message}`)
                console.error('error', response)
            }
        } catch (error) {
            showMessage('error', 'Error requesting money')
            console.error(error)
        }
    }

    const onClose = () => {
        if (!showModal) {
            console.error('showModal is null')
            return
        }

        toggleModal('request')

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
                    <h5 className="modal-title">Request money</h5>
                    <button onClick={onClose}>x</button>
                </div>
                <div className="form-content">
                    <form onSubmit={onFormSubmitHandler} className="custom-form">
                        <div className="form-group">
                            <label htmlFor="amount">Amount:</label>
                            <input
                                type="text"
                                name="amount"
                                id="amount"
                                value={userInput.amount}
                                onChange={setUserInputHandler}
                                className="form-control"
                                placeholder="10 BGN"
                            />
                        </div>
                        <div className="form-group">
                            <div className="form-group ">
                                <label htmlFor="friends">Friend:</label>
                                <Autocomplete
                                    name="friends"
                                    userInput={userInput}
                                    setUserInput={setUserInput}
                                    suggestions={[...receiver]}
                                />
                            </div>
                        </div>
                        <footer>
                            <input className="button-primary" type="submit" value="Send" style={{ width: '100%' }} />
                        </footer>
                    </form>
                </div>
            </div>
        </div>
    )
}
