export const Balance = ({cardNumber, expiryDate, name, balance}) => {

    // TO DO last digits
    // let lastDigits = cardNumber.splice(-4, 4);
    // let lastDigits = cardNumber;
    // lastDigits.splice(-4);
    return (
        <div className="custom-block custom-block-balance">
            <small>Your Balance</small>

            <h2 className="mt-2 mb-3">${balance}</h2>

            <div className="custom-block-numbers d-flex align-items-center">
                <span>****</span>
                <span>****</span>
                <span>****</span>
                <p>{cardNumber}</p>
            </div>

            <div className="d-flex">
                <div>
                    <small>Valid Date</small>
                    <p>{expiryDate}</p>
                </div>

                <div className="ms-auto">
                    <small>Card Holder</small>
                    <p>{name}</p>
                </div>
            </div>
        </div>
    )
}