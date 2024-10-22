import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import { Notifications, ProfileDropdown, MobileMenu, LoginButtons } from './assets/index'
import { AuthContext } from '../../contexts/AuthContext'

import styles from './site-header.module.css'

export const Header = () => {
    const { isAuthenticated, picture, onLogoutHandler, name } = useContext(AuthContext)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 600)
    const navigate = useNavigate()

    const showIcon = isMobile ? (
        <FontAwesomeIcon className={styles.headerDropdownIcon} icon={faBars} />
    ) : null
    const showButtons = isMobile ? <MobileMenu styles={styles} /> : <LoginButtons />

    const authContent = isAuthenticated() ? (
        <div className={styles.headerDropdownContainer}>
            <Notifications />
            <ProfileDropdown onLogoutHandler={onLogoutHandler} name={name} picture={picture} />
        </div>
    ) : (
        <div className={isMobile ? styles.headerMobileDropdown : styles.headerButtons}>
            {showIcon}
            {showButtons}
        </div>
    )

    const handleResize = () => {
        setIsMobile(window.innerWidth < 800)
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const onRedirect = () => {
        if (isAuthenticated()) {
            navigate('/dashboard/overview')
        } else {
            navigate('/')
        }
    }

    return (
        <header className={styles.headerContainer}>
            <div className={styles.logoContainer}>
                <img
                    src="https://res.cloudinary.com/dzh01qrmx/image/upload/v1729501409/newLogoPng_brnw5j.png"
                    onClick={onRedirect}
                    alt="logo"
                    className={styles.logo}
                />
            </div>
            {authContent}
        </header>
    )
}
