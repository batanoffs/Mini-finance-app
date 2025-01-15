import { useOutletContext } from 'react-router-dom';

export const UserSettingsLayout = ({ aside = [], NavComponent = () => null }) => {
    const styles = useOutletContext();

    return (
        <div className={styles.contentContainer}>
            <main className={styles.bentoFillColumn}>
                <NavComponent />
            </main>

            <aside className={styles.bentoSideColumn}>
                {aside &&
                    aside.length > 0 &&
                    aside.map((Component, index) => <Component key={index} />)}
            </aside>
        </div>
    );
};
