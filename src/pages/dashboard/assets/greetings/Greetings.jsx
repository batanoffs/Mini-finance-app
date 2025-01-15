import { useContext } from 'react'
import { AuthContext } from '../../../../contexts/AuthContext'

import { EmptyCard } from '../../../../components/cards'

export const Greetings = () => {
    const { auth } = useContext(AuthContext)

    return <EmptyCard title={`Welcome back, ${auth.fullName}!`} color="primary" />
}
