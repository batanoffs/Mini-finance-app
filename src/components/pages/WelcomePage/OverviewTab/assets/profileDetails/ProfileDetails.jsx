// import profilePicture from "../../../images/medium-shot-happy-man-smiling.jpg"
import { useContext } from 'react'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../../../../contexts/AuthContext'

import blocks from '../../../custom-block.module.css'

export const ProfileDetails = () => {
    const { name, picture, phone, email, address, country } = useContext(AuthContext)
    
    return (
        <div className={`${blocks.customBlock} ${blocks.customBlockProfile}`}>
            <div className={blocks.customBlockProfileImageWrap}>
                <img src={picture} className={blocks.customBlockProfileImage} alt="avatar" />

                <Link to="/dashboard/settings" className={blocks.customBlockEditIcon}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                </Link>
            </div>

            <p>
                <strong>Name:</strong>

                <span> {name}</span>
            </p>
            <p>
                <strong>Email:</strong>
                <a
                    href={`mailto:${email}`}
                    style={{
                        paddingLeft: '5px',
                        color: 'var(--heading-color)',
                        hover: 'white',
                    }}
                >
                    {email}
                </a>
            </p>
            <p style={{ paddingBottom: '0' }}>
                <strong>Phone:</strong>
                <a
                    href={`tel:${phone}`}
                    style={{
                        paddingLeft: '5px',
                        color: 'var(--heading-color)',
                    }}
                >
                    {phone}
                </a>
            </p>
            {country && (
                <p>
                    <strong>Country:</strong>
                    <span> {country}</span>
                </p>
            )}
            {address && (
                <p>
                    <strong>Address:</strong>
                    <span>{address}</span>
                </p>
            )}
        </div>
    )
}
