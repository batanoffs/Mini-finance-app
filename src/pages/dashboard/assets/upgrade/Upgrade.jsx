import { useState } from 'react';

import styles from './upgrade.module.css';

export const Upgrade = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [currentPlan, setCurrentPlan] = useState('Basic');

    const handlePlanClick = (plan) => {
        setSelectedPlan(plan);
    };

    const handleConfirmClick = () => {
        console.log(`Plan confirmed: ${selectedPlan}`);
        setCurrentPlan(selectedPlan);
    };

    return (
        // <div className={styles.upgradeWrapper}>
        <div className={styles.container}>
            <h1>Select a New Financial Plan</h1>
            <div className="current-choice">
                <p>
                    Your current plan is: <b>{currentPlan}</b>.
                </p>
                {selectedPlan ? (
                    <p style={{ color: 'green' }}>
                        You have selected the <b>{selectedPlan}</b> plan.
                    </p>
                ) : null}
            </div>
            <div className={styles.bentoGridPlans}>
                <div
                    className={
                        selectedPlan === 'Basic' ? styles.bentoCellSelected : styles.bentoCell
                    }
                    onClick={() => handlePlanClick('Basic')}
                >
                    <div className={styles.plan}>
                        <h3>Basic</h3>
                        <p>free</p>
                        <ul className={styles.displayFeatures}>
                            <li>Virtual transactions</li>
                            <li>Data protection</li>
                            <li>24/7 Support</li>
                        </ul>
                    </div>
                </div>
                <div
                    className={
                        selectedPlan === 'Premium' ? styles.bentoCellSelected : styles.bentoCell
                    }
                    onClick={() => handlePlanClick('Premium')}
                >
                    <div className={styles.plan}>
                        <h3>Premium</h3>
                        <p>20 BGN/month</p>
                        <ul className={styles.displayFeatures}>
                            <li>Virtual transactions</li>
                            <li>Advanced security features</li>
                            <li>Priority support</li>
                        </ul>
                    </div>
                </div>
                <div
                    className={
                        selectedPlan === 'Enterprise' ? styles.bentoCellSelected : styles.bentoCell
                    }
                    onClick={() => handlePlanClick('Enterprise')}
                >
                    <div className={styles.plan}>
                        <h3>Enterprise</h3>
                        <p>50 BGN/month</p>
                        <ul className={styles.displayFeatures}>
                            <li>Virtual transactions</li>
                            <li>Custom security solutions</li>
                            <li>Account manager and financial analyst</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className={styles.confirmContainer}>
                <button className={styles.confirmButton} onClick={handleConfirmClick}>
                    Confirm
                </button>
            </div>
        </div>
        // </div>
    );
};
