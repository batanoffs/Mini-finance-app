import { useOutletContext } from 'react-router-dom';

const Main = ({ children }) => {
    const styles = useOutletContext();

    return <section className={styles.bentoMainColumn}>{children}</section>;
};
const Fill = ({ children }) => {
    const styles = useOutletContext();

    return <section className={styles.bentoFillColumn}>{children}</section>;
};
const Aside = ({ children }) => {
    const styles = useOutletContext();

    return <section className={styles.bentoSideColumn}>{children}</section>;
};

export const BentoGrid = {
    Main,
    Fill,
    Aside,
};
