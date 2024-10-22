export const MobileMenu = () => {
    return (
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
                        Log in
                    </Link>
                </li>
                <li>
                    <Link className={styles.dropdownItem} to="/register">
                        New Account
                    </Link>
                </li>
            </ul>
        </div>
    )
}
