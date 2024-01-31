import "./upgrade.css";

export const Upgrade = () => {
    return (
        <div class="upgrade-wrapper">
            <div class="container">
                <h1>Избор на нов финансов план</h1>
                <div class="current-choice">
                    <p>Вашият план в момента е: Безплатен.</p>
                </div>
                <div class="bento-grid plans">
                    <div class="bento-cell">
                        <div class="plan">
                            <h3>Безплатен</h3>
                            <ul>
                                <li>Basic features</li>
                                <li>Limited access</li>
                            </ul>
                            <button>Your Current Plan</button>
                        </div>
                    </div>
                    <div class="bento-cell">
                        <div class="plan">
                            <h3>Стандартен</h3>
                            <ul>
                                <li>Basic features</li>
                                <li>Limited access</li>
                            </ul>
                            <button>Your Current Plan</button>
                        </div>
                    </div>
                    <div class="bento-cell">
                        <div class="plan">
                            <h3>Оптимален</h3>
                            <ul>
                                <li>All features</li>
                                <li>Full access</li>
                            </ul>
                            <button>Select Paid Plan</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
