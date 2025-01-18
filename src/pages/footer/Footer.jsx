import { isAuthenticated } from '../../utils/sessionStorage'

import styles from './site-footer.module.css'

export const Footer = () => {
    const homeLink = window.location.pathname === '/'

    if (homeLink) {
        return null
    }
    
    return (
        <>
            {!isAuthenticated() && (
                <footer className={styles.site_footer}>
                    <div className={styles.footer_container}>
                        <p className={styles.copyright_text}>
                            All rights reserved &copy; Mini Finance Innovations 2024. Programmed by{' '}
                            <a href="https://github.com/batanoffs">batanoffs.</a> Illustration by{' '}
                            <a href="https://icons8.com/illustrations/author/627444">Julia G</a> from{' '}
                            <a href="https://icons8.com/illustrations">Ouch!</a>
                        </p>
                    </div>
                </footer>
            )}
        </>
    )
}
