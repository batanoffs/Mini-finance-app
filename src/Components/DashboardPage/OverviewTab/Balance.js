export const Balance = ({creditCard, name, balance}) => {
    let card = creditCard.cardNumber;
    // TO DO last digits
    const splitDigits = (number) => {
        if (number) {
            return number.toString().split('').splice(-4).join('');
        }
        return "****"
    }

    return (
        <div className="custom-block custom-block-balance">
            <small>Your Balance</small>

            <h2 className="mt-2 mb-3">${balance}</h2>

            <div className="custom-block-numbers d-flex align-items-center">
                <span>****</span>
                <span>****</span>
                <span>****</span>
                <p>{splitDigits(card)}</p>
            </div>

            <div className="d-flex">
                <div>
                    <small>Valid Date</small>
                    <p>{creditCard.expiryDate}</p>
                </div>

                <div className="ms-auto">
                    <small>Card Holder</small>
                    <p>{name}</p>
                </div>
            </div>
        </div>
    )
}