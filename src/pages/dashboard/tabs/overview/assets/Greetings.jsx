import { useContext } from 'react'
import { AuthContext } from '../../../../../contexts/AuthContext'

import containers from '../../../assets/containers.module.css'

export const Greetings = () => {
    const { name } = useContext(AuthContext)

    return (
        <div className={`${containers.customBlock} ${containers.customBlockBottom}`}>
            <div className="title-group">
                <h5 style={{ paddingBottom: '0px' }}>Welcome back, {name}!</h5>
            </div>
        </div>
    )
}
