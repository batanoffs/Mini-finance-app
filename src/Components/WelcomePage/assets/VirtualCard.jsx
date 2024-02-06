import { AuthContext } from "../../../contexts/AuthContext";
import { useContext } from "react";

export const VirtualCard = () => {
    const { virtualcard, name } = useContext(AuthContext);
    let card = virtualcard.number;
    // TO DO last digits
    const splitDigits = (number) => {
        if (number) {
            return number.toString().split("").splice(-4).join("");
        }
        return "****";
    };

    return (
        <div className="custom-block custom-block-balance">
            <h5>Наличност</h5>

            <h5 className="mt-2 mb-3">{virtualcard.balance}</h5>

            <div className="custom-block-numbers d-flex align-items-center">
                <span>****</span>
                <span>****</span>
                <span>****</span>
                <small>{splitDigits(card)}</small>
            </div>

            <div
                className="d-flex"
                style={{ display: "flex", justifyContent: "space-between" }}
            >
                <div>
                    <h5>Валидна до</h5>
                    <small>{virtualcard.expiration}</small>
                </div>

                <div className="ms-auto">
                    <h5>Картодържател</h5>
                    <small>{name}</small>
                </div>
            </div>
        </div>
    );
};
