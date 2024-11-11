import { balanceFormat } from '../../../utils/balanceFormat'
import { showLastCardDigits } from '../../../utils/showLastCardDigits'
import { useVirtualCard } from '../../../hooks/useVirtualCard'

import containers from './virtual.module.css'
import { EmptyCard } from '../empty/EmptyCard'

export const VirtualCard = () => {
    const [card, auth] = useVirtualCard()

    return (
        <EmptyCard color="secondary" title={'Balance'} className={containers.customBlockBalance}>
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
        </EmptyCard>
    )
}
