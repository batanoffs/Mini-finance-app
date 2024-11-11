import styles from './empty-card.module.css'

export const EmptyCard = ({
    children,
    className = '',
    title = '',
    color = 'primary',
    options = {
        menu: null,
    },
}) => {
    const backgroundColor = {
        primary: styles.primary,
        secondary: styles.secondary,
        accent: styles.accent,
    }[color]

    return (
        <section className={`${styles.customBlock} ${backgroundColor} ${className}`}>
            <header className={styles.header}>
                <h5>{title}</h5>
                {options.menu && typeof options.menu === 'string' ? <span>{options.menu}</span> : options.menu}
            </header>

            {children && <article className={styles.content}>{children}</article>}
        </section>
    )
}
