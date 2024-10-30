import { useState, useEffect, useCallback, useContext } from 'react'
import { transactionService } from '../services/transactionService'
import { AuthContext } from '../contexts/AuthContext'

export const useTransactions = (transactionType) => {
    const [transactions, setTransactions] = useState([])
    const { userDataId, token } = useContext(AuthContext)

    const fetchTransactions = useCallback(async () => {
        try {
            let result
            if (transactionType === 'sender') {
                result = await transactionService.getAllSender(userDataId, token)
            } else if (transactionType === 'receiver') {
                result = await transactionService.getAllReceiver(userDataId, token)
            }
            setTransactions(result)
        } catch (error) {
            console.log(error)
        }
    }, [userDataId, token, transactionType])

    useEffect(() => {
        fetchTransactions()
    }, [fetchTransactions])

    return transactions
}
