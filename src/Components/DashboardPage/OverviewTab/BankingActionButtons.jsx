export const BankingActionButtons = () => {
    return (
        <div className="custom-block custom-block-bottom d-flex flex-wrap">
            <div className="custom-block-bottom-item">
                <a href="#" className="d-flex flex-column">
                    <i className="custom-block-icon bi-wallet"></i>

                    <small>Зареди</small>
                </a>
            </div>

            <div className="custom-block-bottom-item">
                <a href="#" className="d-flex flex-column">
                    <i className="custom-block-icon bi-upc-scan"></i>

                    <small>Сканирай</small>
                </a>
            </div>

            <div className="custom-block-bottom-item">
                <a href="#" className="d-flex flex-column">
                    <i className="custom-block-icon bi-send"></i>

                    <small>Изпрати</small>
                </a>
            </div>

            <div className="custom-block-bottom-item">
                <a href="#" className="d-flex flex-column">
                    <i className="custom-block-icon bi-arrow-down"></i>

                    <small>Вземи</small>
                </a>
            </div>
        </div>
    )
}