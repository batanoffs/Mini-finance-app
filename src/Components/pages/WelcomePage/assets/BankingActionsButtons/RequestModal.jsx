import { useState, useContext, useEffect } from 'react'

import { transactionService } from '../../../../../services/transactionService'
import { dataService } from '../../../../../services/userDataService'
import { AuthContext } from '../../../../../contexts/AuthContext'
import { Autocomplete } from '../../../../features/Autocomplete'
import { useMessage } from '../../../../../hooks/useMessage'

import modal from './modal.module.css'

export const RequestMoney = ({ userInput, setUserInput, showModal, setShowModal }) => {
    const { userDataId, token } = useContext(AuthContext)
    const [receiver, setReceiver] = useState([])
    const showMessage = useMessage()

    useEffect(() => {
        dataService.getRelation(userDataId, 'friends').then((response) => {
            setReceiver(
                response.friends.map((friend) => {
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
            )
        })
    }, [userDataId, setReceiver])

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

            const response = await transactionService.requestNotify(
                friends,
                Number(amount),
                userDataId,
                token
            )

            if (!response) throw new Error('TransactionService response is null')

            if (response.success) {
                setShowModal({ ...showModal, [`request`]: false })
                setUserInput({ amount: '', friends: '' })
                showMessage('success', 'Успешно поискахте парите')
            } else {
                setShowModal({ ...showModal, [`request`]: false })
                setUserInput({ amount: '', friends: '' })
                showMessage('error', `Грешка при изпращане: ${response.message}`)
                console.error('error', response)
            }
        } catch (error) {
            showMessage('error', 'Грешка при изпращане')
            console.error(error)
        }
    }

    const onClose = () => {
        if (!showModal) {
            console.error('showModal is null')
            return
        }

        setShowModal({ ...showModal, [`request`]: false })

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
                    <h5 className="modal-title">Поискай пари</h5>
                    <button onClick={onClose}>x</button>
                </div>
                <div className="form-content">
                    <form onSubmit={onFormSubmitHandler} className="custom-form">
                        <div className="form-group">
                            <label htmlFor="amount">Сума:</label>
                            <input
                                type="text"
                                name="amount"
                                id="amount"
                                value={userInput.amount}
                                onChange={setUserInputHandler}
                                className="form-control"
                                placeholder="10лв"
                            />
                        </div>
                        <div className="form-group">
                            <div className="form-group ">
                                <label htmlFor="friends">Приятел:</label>
                                <Autocomplete
                                    name="friends"
                                    userInput={userInput}
                                    setUserInput={setUserInput}
                                    suggestions={[...receiver]}
                                />
                            </div>
                        </div>
                        <footer>
                            <input
                                className="button-primary"
                                type="submit"
                                value="Изпрати"
                                style={{ width: '100%' }}
                            />
                        </footer>
                    </form>
                </div>
            </div>
        </div>
    )
}
