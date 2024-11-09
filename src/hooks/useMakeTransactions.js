import { useCallback, useContext, useEffect, useState } from 'react'

import { useMessage } from './useMessage'
import { AuthContext } from '../contexts/AuthContext'
import { dataService } from '../services/userDataService'

export const useMakeTransactions = ({ transactionType, toggleModal, showModal }) => {
    const [values, setValues] = useState({ amount: '', friends: '' })
    const { userDataId, token } = useContext(AuthContext)
    const [friends, setFriends] = useState([])
    const showMessage = useMessage()

    const fetchFriends = useCallback(async () => {
        try {
            const response = await dataService.getRelation(userDataId, 'friends')
            const filterFriends = response.friends?.map((friend) => {
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
            setFriends(filterFriends)
        } catch (error) {
            showMessage('error', 'Error during fetching')
        }
    }, [])

    useEffect(() => {
        fetchFriends()
    }, [fetchFriends])

    const setUserInputHandler = (event) => {
        if (!event || !event.target) throw new Error('Null pointer exception: event is null')

        const { name, value } = event.target

        if (!name || !value) throw new Error('Name or value is null')

        setValues({ ...values, [name]: value })
    }

    const onFormSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            if (!e.target) throw new Error('Target element does not exist.')

            const formElementSelect = e.target
            const form = new FormData(formElementSelect)

            if (!form) throw new Error('Form data is null')

            const { amount, friends } = Object.fromEntries(form)

            if (!amount || !friends) throw new Error('Amount or friend is not given.')

            let response

            if (transactionType === 'request') {
                response = await transactionService.requestNotify(friends, Number(amount), userDataId, token)
            }

            if ((transactionType = 'send')) {
                response = await transactionService.sendMoney(friends, Number(amount), userDataId, token)
                if (!response) throw new Error('Transaction service response is null.')
                if (!response.success) throw new Error(`Transaction service error: ${response.message}`)
                await transactionService.notifyMoneyReceived(friends, Number(amount), userDataId, token)
            }

            if (response.success) {
                toggleModal(transactionType)
                setValues((prev) => ({ ...prev, amount: '', friends: '' }))
                showMessage('success', `Successfully ${transactionType} the money`)
            } else {
                toggleModal(transactionType)
                setValues((prev) => ({ ...prev, amount: '', friends: '' }))
                showMessage('error', `Error during ${transactionType}: ${response.message}`)
            }
        } catch (error) {
            toggleModal(transactionType)
            setValues((prev) => ({ ...prev, amount: '', friends: '' }))
            showMessage('error', `Error during ${transactionType}: ${error.message}`)
        }
    }

    const onClose = () => {
        if (!showModal) throw new Error('showModal is null')
        if (!showModal[transactionType]) throw new Error('showModal.send is null')

        toggleModal(transactionType)
        setValues((prev) => ({ ...prev, amount: '', friends: '' }))
    }

    return { values, setValues, setUserInputHandler, onFormSubmitHandler, onClose, friends }
}
