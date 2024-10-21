import { useContext, useEffect, useState } from 'react'

import { transactionService } from '../../../../services/transactionService'
import { showLastCardDigits } from '../../../../utils/showLastCardDigits'
import { AuthContext } from '../../../../contexts/AuthContext'

import blocks from '../custom-block.module.css'
import { balanceFormat } from '../../../../utils/balanceFormat'

export const VirtualCard = () => {
    const { userDataId, token, auth, setAuth, virtualCard } = useContext(AuthContext)
    const [card, setCard] = useState(virtualCard)
    const style = {
        animation: 'spin 2s linear 1',

        '@keyframes spin': {
            from: { transform: 'rotate(0deg)' },
            to: { transform: 'rotate(360deg)' },
        },
    }

    useEffect(() => {
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

    return (
        <div style={style} className={`${blocks.customBlock} ${blocks.customBlockBalance}`}>
            <h5>Balance</h5>
            <h4 style={{ color: 'var(--white-color)' }}>
                {card.balance ? balanceFormat(card.balance) + ' BGN' : '0 BGN'}
            </h4>

            <div className={blocks.customBlockNumbers}>
                <span>****</span>
                <span>****</span>
                <span>****</span>
                <small>{showLastCardDigits(card.number)}</small>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <h6>Valid</h6>
                    <small>{card.expiration}</small>
                </div>

                <div>
                    <h6>Owner</h6>
                    <small>{auth.fullName}</small>
                </div>
            </div>
        </div>
    )
}
