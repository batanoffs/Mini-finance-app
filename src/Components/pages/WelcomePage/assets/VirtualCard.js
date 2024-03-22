import { AuthContext } from "../../../../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import { transactionService } from "../../../../services/transactionService";
import blocks from "../custom-block.module.css";

export const VirtualCard = () => {
    const { userDataId, token, auth, setAuth } = useContext(AuthContext);
    const [ card, setCard ] = useState(auth.virtualcard);

    useEffect(() => {
        transactionService.updateBalance(userDataId, card.objectId, token)
            .then((data) => {
                setCard({...card, balance: data.results.updateMoney.result.balance});
                setAuth({...auth, virtualcard: {...card, balance: data.results.updateMoney.result.balance}});
            })
            .catch((err) => console.log(err));
    }, []);

    const splitDigits = (number) => {
        if (number) {
            return number.toString().split("").splice(-4).join("");
        }
        return "****";
    };

    return (
        <div className={`${blocks.customBlock} ${blocks.customBlockBalance}`}>
            <h5 >Наличност</h5>
            <h4 style={{ color: "var(--white-color)" }}>{card.balance}лв</h4>

            <div className={blocks.customBlockNumbers}>
                <span>****</span>
                <span>****</span>
                <span>****</span>
                <small>{splitDigits(card.number)}</small>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                    <h6>Валидна</h6>
                    <small>{card.expiration}</small>
                </div>

                <div>
                    <h6>Притежател</h6>
                    <small>{auth.fullName}</small>
                </div>
            </div>
        </div>
    );
};