import styles from './modal.module.css';

export const ModalForm = ({ children, title, isVisible, setVisible }) => {
    const onCloseOutsideClick = (e) => {
        if (e.target === e.currentTarget) setVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className={styles.background} onClick={onCloseOutsideClick}>
            <div className={styles.container}>
                <header>
                    <h5>{title}</h5>
                    <button onClick={() => setVisible(false)}>X</button>
                </header>
                {children}
            </div>
        </div>
    );
};
