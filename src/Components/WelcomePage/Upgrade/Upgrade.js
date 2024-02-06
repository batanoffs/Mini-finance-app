export const Upgrade = () => {
    return (
        <div className="upgrade-wrapper">
            <div className="container">
                <h1>Избор на нов финансов план</h1>
                <div className="current-choice">
                    <p>Вашият план в момента е: Безплатен.</p>
                </div>
                <div className="bento-grid plans">
                    <div className="bento-cell">
                        <div className="plan">
                            <h5>Безплатен</h5>
                            <ul>
                                <li>Basic features</li>
                                <li>Limited access</li>
                            </ul>
                            <button>Your Current Plan</button>
                        </div>
                    </div>
                    <div className="bento-cell">
                        <div className="plan">
                            <h5>Стандартен</h5>
                            <ul>
                                <li>Basic features</li>
                                <li>Limited access</li>
                            </ul>
                            <button>Your Current Plan</button>
                        </div>
                    </div>
                    <div className="bento-cell">
                        <div className="plan">
                            <h5>Оптимален</h5>
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
