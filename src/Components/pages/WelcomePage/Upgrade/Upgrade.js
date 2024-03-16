import styles from './upgrade.module.css'

export const Upgrade = () => {
    const handlePlanClick = (plan) => {
        console.log(`Избран план: ${plan}`);
    }
    return (
        <div className={styles.upgradeWrapper}>
            <div className={styles.container}>
                <h1>Избор на нов финансов план</h1>
                <div className="current-choice">
                    <p>Вашият план в момента е: Безплатен.</p>
                </div>
                <div className={styles.bentoGridPlans}>
                    <div className={styles.bentoCell} onClick={() => handlePlanClick("Безплатен")}>
                        <div className={styles.plan}>
                            <h3>Базов</h3>
                            <p>безплатен</p>
                            <ul className={styles.list}>
                                <li>Виртуални трансакции</li>
                                <li>Защитени данни</li>
                                <li>Поддръжка 24/7</li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.bentoCell} onClick={() => handlePlanClick("Стандартен")}>
                        <div className={styles.plan}>
                            <h3>Премиум</h3>
                            <p>20 лв./месечно</p>
                            <ul className={styles.list}>
                                <li>Виртуални трансакции</li>
                                <li>Разширени безопасностни функции</li>
                                <li>Приоритетна поддръжка</li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.bentoCell} onClick={() => handlePlanClick("Оптимален")}>
                        <div className={styles.plan}>
                            <h3>Ентърпрайс</h3>
                            <p>50 лв./месечно</p>
                            <ul className={styles.list}>
                                <li>Виртуални трансакции</li>
                                <li>Персонализирани сигурностни решения</li>
                                <li>Акаунт мениджър и финансов анализатор</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
