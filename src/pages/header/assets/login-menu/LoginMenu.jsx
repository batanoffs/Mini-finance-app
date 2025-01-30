import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import styles from './LoginMenu.module.css';

export const LoginMenu = () => {
    return (
        <div className={styles.loginMenuContainer}>
            <div
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                className={styles.dropdownToggle}
            >
                <div className={`${styles.headerMobileDropdown} ${styles.headerButtons}`}>
                    <FontAwesomeIcon className={styles.headerDropdownIcon} icon={faBars} />
                </div>
            </div>
            <ul className={styles.dropdownMenu}>
                <li>
                    <Link
                        to="/login"
                        className={`${styles.buttonLogin} ${styles.dropdownItem}`}
                        type="button"
                        style={{
                            borderBottomRightRadius: '0px',
                            borderTopRightRadius: '0px',
                        }}
                    >
                        LOGIN
                    </Link>
                </li>
                <li>
                    <Link
                        to="/register"
                        className={`${styles.buttonRegister} ${styles.dropdownItem}`}
                        name="register"
                        type="button"
                    >
                        NEW ACCOUNT
                    </Link>
                </li>
            </ul>
        </div>
    );
};
