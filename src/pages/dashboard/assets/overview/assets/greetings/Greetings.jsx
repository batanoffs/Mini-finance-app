import { useContext } from 'react'
import { AuthContext } from '../../../../../../contexts/AuthContext'

import styles from './greetings.module.css'

export const Greetings = () => {
    const { name } = useContext(AuthContext)

    return (
        <div className={`${styles.customBlock} ${styles.customBlockBottom}`}>
            <div className="title-group">
                <h5 style={{ paddingBottom: '0px' }}>Welcome back, {name}!</h5>
            </div>
        </div>
    )
}
