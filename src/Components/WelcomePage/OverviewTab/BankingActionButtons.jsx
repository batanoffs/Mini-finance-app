export const BankingActionButtons = () => {
    return (
        <div className="custom-block custom-block-bottom d-flex flex-wrap pt-4 pb-3">
            <div className="custom-block-bottom-item">
                <a href="#" className="d-flex flex-column">
                    <i className="custom-block-icon bi-wallet"></i>

                    <small>захрани</small>
                </a>
            </div>

            <div className="custom-block-bottom-item">
                <a href="#" className="d-flex flex-column">
                    <i className="custom-block-icon bi-upc-scan"></i>

                    <small>сканирай</small>
                </a>
            </div>

            <div className="custom-block-bottom-item">
                <a href="#" className="d-flex flex-column">
                    <i className="custom-block-icon bi-send"></i>

                    <small>изпрати</small>
                </a>
            </div>

            <div className="custom-block-bottom-item">
                <a href="#" className="d-flex flex-column">
                    <i className="custom-block-icon bi-arrow-down"></i>

                    <small>поискай</small>
                </a>
            </div>
        </div>
    )
}