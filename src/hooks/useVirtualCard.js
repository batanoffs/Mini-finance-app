import { useCallback, useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { transactionService } from '../services/transactionService'

export const useVirtualCard = () => {
    const { userDataId, token, auth, setAuth, virtualCard } = useContext(AuthContext)
    const [card, setCard] = useState(virtualCard)

    const fetchBalance = useCallback(() => {
        transactionService
            .updateBalance(userDataId, card.objectId, token)
            .then((data) => {
                setCard({ ...card, balance: data.results.updateMoney.result.balance })
                setAuth({
                    ...auth,
                    virtualcard: { ...card, balance: data.results.updateMoney.result.balance },
                })
            })
            .catch((err) => console.log(err))
    }, [])

    return [card, auth, fetchBalance]
}
