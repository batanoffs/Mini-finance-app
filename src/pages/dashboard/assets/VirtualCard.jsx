import { useEffect } from 'react'

import { balanceFormat } from '../../../utils/balanceFormat'
import { showLastCardDigits } from '../../../utils/showLastCardDigits'
import { useVirtualCard } from '../../../hooks/useVirtualCard'

import containers from './containers.module.css'

export const VirtualCard = () => {
    const [card, auth, fetchBalance] = useVirtualCard()

    useEffect(() => {
        fetchBalance()
    }, [fetchBalance])

    return (
        <div className={`${containers.customBlock} ${containers.customBlockBalance}`}>
            <h5>Balance</h5>
            <h4 style={{ color: 'var(--white-color)' }}>
                {card.balance ? balanceFormat(card.balance) + ' BGN' : '0 BGN'}
            </h4>

            <div className={containers.customBlockNumbers}>
                <span>**** **** ****</span>
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
