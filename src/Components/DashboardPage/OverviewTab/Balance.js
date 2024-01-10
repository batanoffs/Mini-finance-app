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
            <small>Твоята наличност:</small>

            <h2 className="mt-2 mb-3">${balance}</h2>

            <div className="custom-block-numbers d-flex align-items-center">
                <span>****</span>
                <span>****</span>
                <span>****</span>
                <p>{splitDigits(card)}</p>
            </div>

            <div className="d-flex">
                <div>
                    <small>Валидна до:</small>
                    <p>{creditCard.expiryDate}</p>
                </div>

                <div className="ms-auto">
                    <small>картодържател:</small>
                    <p>{name}</p>
                </div>
            </div>
        </div>
    )
}