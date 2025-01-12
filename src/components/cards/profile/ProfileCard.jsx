import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AuthContext } from '../../../contexts/AuthContext'
import { EmptyCard } from '../empty/EmptyCard'

import containers from './profile.module.css'

export const ProfileCard = () => {
    const { auth } = useContext(AuthContext)

    return (
        <EmptyCard color="secondary" className={containers.customBlockProfile}>
            <div className={containers.customBlockProfileImageWrap}>
                <img src={auth.avatar} className={containers.customBlockProfileImage} alt="avatar" />

                <Link to="/dashboard/settings" className={containers.customBlockEditIcon}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                </Link>
            </div>

            <p>
                <strong>Name: </strong>
                <span>{auth.fullName}</span>
            </p>

            <p>
                <strong>Email: </strong>
                <a
                    href={`mailto:${auth.email}`}
                    style={{
                        color: 'var(--heading-color)',
                        hover: 'white',
                    }}
                >
                    {auth.email}
                </a>
            </p>
            <p style={{ paddingBottom: '0' }}>
                <strong>Phone:</strong>
                <a
                    href={`tel:${auth.phoneNumber}`}
                    style={{
                        paddingLeft: '5px',
                        color: 'var(--heading-color)',
                    }}
                >
                    {auth.phoneNumber}
                </a>
            </p>
            {auth.country && (
                <p>
                    <strong>Country:</strong>
                    <span> {auth.country}</span>
                </p>
            )}
            {auth.address && (
                <p>
                    <strong>Address: </strong>
                    <span>{auth.address}</span>
                </p>
            )}
        </EmptyCard>
    )
}
