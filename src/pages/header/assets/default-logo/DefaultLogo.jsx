import styles from './default-logo.module.css';

export const DefaultLogo = ({ onRedirect }) => {
    return (
        <div className={styles.logoContainer}>
            <img
                src="https://res.cloudinary.com/dzh01qrmx/image/upload/v1729501409/newLogoPng_brnw5j.png"
                onClick={onRedirect}
                alt="logo"
                className={styles.logo}
            />
        </div>
    );
};
