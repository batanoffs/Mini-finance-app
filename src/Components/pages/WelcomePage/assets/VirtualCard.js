import { AuthContext } from "../../../../contexts/AuthContext";
import { useContext } from "react";
import blocks from "../custom-block.module.css";

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
        <div className={`${blocks.customBlock} ${blocks.customBlockBalance}`}>
            <h5>Наличност</h5>

            <h5>{virtualcard.balance}лв</h5>

            <div className={blocks.customBlockNumbers}>
                <span>****</span>
                <span>****</span>
                <span>****</span>
                <small>{splitDigits(card)}</small>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                    <h6>Валидна до</h6>
                    <small>{virtualcard.expiration}</small>
                </div>

                <div>
                    <h6>Картодържател</h6>
                    <small>{name}</small>
                </div>
            </div>
        </div>
    );
};
