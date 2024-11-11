import { useContext } from 'react'
import { AuthContext } from '../../../../../../contexts/AuthContext'

import { EmptyCard } from '../../../../../../components/cards'

export const Greetings = () => {
    const { name } = useContext(AuthContext)

    return <EmptyCard title={`Welcome back, ${name}!`} color="primary" />
}
