import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import { Notifications } from './assets/Notifications'
import { ProfileDropdown } from './assets/ProfileDropdown'

import { AuthContext } from '../../../contexts/AuthContext'

import styles from './site-header.module.css'

export const Header = () => {
    const { isAuthenticated, picture, onLogoutHandler, name } = useContext(AuthContext)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 600)
    const navigate = useNavigate()
    const showIcon = isMobile ? (
        <FontAwesomeIcon className={styles.headerDropdownIcon} icon={faBars} />
    ) : null

    const showButtons = isMobile ? (
        <div
            to="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            className={styles.dropdownToggle}
        >
            <ul className={styles.dropdownMenu}>
                <li>
                    <Link className={styles.dropdownItem} to="/login">
                        Вход
                    </Link>
                </li>
                <li>
                    <Link className={styles.dropdownItem} to="/register">
                        Нов Акаунт
                    </Link>
                </li>
            </ul>
        </div>
    ) : (
        <>
            <Link
                to="/login"
                className={styles.buttonLogin}
                type="button"
                style={{
                    borderBottomRightRadius: '0px',
                    borderTopRightRadius: '0px',
                }}
            >
                Вход
            </Link>
            <Link to="/register" className={styles.buttonRegister} name="register" type="button">
                Нов Акаунт
            </Link>
        </>
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
                    src="https://notablepen.backendless.app/api/files/app/AppData/home/newLogoPng.png"
                    onClick={onRedirect}
                    alt="logo"
                    className={styles.logo}
                />
            </div>

            {!isAuthenticated() && (
                <div className={isMobile ? styles.headerMobileDropdown : styles.headerButtons}>
                    {showIcon}
                    {showButtons}
                </div>
            )}

            {isAuthenticated() && (
                <div className={styles.headerDropdownContainer}>
                    <Notifications />
                    <ProfileDropdown
                        onLogoutHandler={onLogoutHandler}
                        name={name}
                        picture={picture}
                    />
                </div>
            )}
        </header>
    )
}
