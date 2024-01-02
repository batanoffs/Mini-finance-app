export const BankingActionButtons = () => {
    return (
        <div className="custom-block custom-block-bottom d-flex flex-wrap">
            <div className="custom-block-bottom-item">
                <a href="#" className="d-flex flex-column">
                    <i className="custom-block-icon bi-wallet"></i>

                    <small>Top up</small>
                </a>
            </div>

            <div className="custom-block-bottom-item">
                <a href="#" className="d-flex flex-column">
                    <i className="custom-block-icon bi-upc-scan"></i>

                    <small>Scan & Pay</small>
                </a>
            </div>

            <div className="custom-block-bottom-item">
                <a href="#" className="d-flex flex-column">
                    <i className="custom-block-icon bi-send"></i>

                    <small>Send</small>
                </a>
            </div>

            <div className="custom-block-bottom-item">
                <a href="#" className="d-flex flex-column">
                    <i className="custom-block-icon bi-arrow-down"></i>

                    <small>Request</small>
                </a>
            </div>
        </div>
    )
}