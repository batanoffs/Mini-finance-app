import { useState } from 'react'
import styles from './upgrade.module.css'

export const Upgrade = () => {
    const [selectedPlan, setSelectedPlan] = useState(null)
    const [currentPlan, setCurrentPlan] = useState('Базов')

    const handlePlanClick = (plan) => {
        setSelectedPlan(plan);
    }

    const handleConfirmClick = () => {
        console.log(`Плана е потвърден: ${selectedPlan}`)
        setCurrentPlan(selectedPlan);
    }

    return (
        <div className={styles.upgradeWrapper}>
            <div className={styles.container}>
                <h1>Избор на нов финансов план</h1>
                <div className="current-choice">
                    <p>Вашият план в момента е: <b>{currentPlan}</b>.</p>
                    { selectedPlan? <p style={{color: 'green'}}>Вие избрахте <b>{selectedPlan}</b> план.</p> : null }
                </div>
                <div className={styles.bentoGridPlans}>
                    <div className={selectedPlan === 'Базов' ? styles.bentoCellSelected : styles.bentoCell} onClick={() => handlePlanClick("Базов")}>
                        <div className={styles.plan}>
                            <h3>Базов</h3>
                            <p>безплатен</p>
                            <ul className={styles.displayFeatures}>
                                <li>Виртуални трансакции</li>
                                <li>Защитени данни</li>
                                <li>Поддръжка 24/7</li>
                            </ul>
                        </div>
                    </div>
                    <div className={selectedPlan === 'Премиум' ? styles.bentoCellSelected : styles.bentoCell} onClick={() => handlePlanClick("Премиум")}>
                        <div className={styles.plan}>
                            <h3>Премиум</h3>
                            <p>20 лв./месечно</p>
                            <ul className={styles.displayFeatures}>
                                <li>Виртуални трансакции</li>
                                <li>Разширени безопасностни функции</li>
                                <li>Приоритетна поддръжка</li>
                            </ul>
                        </div>
                    </div>
                    <div className={selectedPlan === 'Ентърпрайс' ? styles.bentoCellSelected : styles.bentoCell} onClick={() => handlePlanClick("Ентърпрайс")}>
                        <div className={styles.plan}>
                            <h3>Ентърпрайс</h3>
                            <p>50 лв./месечно</p>
                            <ul className={styles.displayFeatures}>
                                <li>Виртуални трансакции</li>
                                <li>Персонализирани сигурностни решения</li>
                                <li>Акаунт мениджър и финансов анализатор</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={styles.confirmContainer}>
                    <button className={styles.confirmButton} onClick={handleConfirmClick}>Потвърди</button>
                </div>
            </div>
        </div>
    );
};

