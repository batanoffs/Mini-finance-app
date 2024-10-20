import { useContext } from 'react'
import { AuthContext } from '../../../../../contexts/AuthContext'
import blocks from '../../custom-block.module.css'

export const Greetings = () => {
    const { name } = useContext(AuthContext)

    return (
        <div className={`${blocks.customBlock} ${blocks.customBlockBottom}`}>
            <div className="title-group">
                <h5 style={{ paddingBottom: '0px' }}>Welcome back, {name}!</h5>
            </div>
        </div>
    )
}
