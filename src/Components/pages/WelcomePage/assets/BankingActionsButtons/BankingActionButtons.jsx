import { useState } from "react";
import { TopUp } from "./TopUpModal";
import { SendMoney } from "./SendModal";
import { ReceiveMoney } from "./ReceiveModal";
import blocks from "../../custom-block.module.css";

export const BankingActionButtons = () => {
    const [showTopUp, setShowTopUp] = useState(false);
    // const [showScan, setShowScan] = useState(false);
    const [showSend, setShowSend] = useState(false);
    const [showReceive, setShowReceive] = useState(false);

    return (
        <div className={`${blocks.customBlock} ${blocks.customBlockBottom}`} style={{ height: "60px"}}>
            
                
            <div className={blocks.customBlockBottomItem}>
                
                <a href="#" onClick={() => setShowTopUp(true)}>
                    <i className={blocks.customBlockIcon}></i>

                    <small>захрани</small>
                </a>
            </div>

            <div className={blocks.customBlockBottomItem}>
                <a href="#" onClick={() => setShowSend(true)}>
                    <i className={blocks.customBlockIcon}></i>

                    <small>изпрати</small>
                </a>
            </div>

            <div className={blocks.customBlockBottomItem}>
                <a href="#" onClick={() => setShowReceive(true)}>
                    <i className={blocks.customBlockIcon}></i>

                    <small>поискай</small>
                </a>
            </div>
            {showTopUp && <TopUp setShowTopUp={setShowTopUp} />}
            {showSend && <SendMoney setShowSend={setShowSend} />}
            {showReceive && <ReceiveMoney setShowReceive={setShowReceive} />}
        </div>
    );
};
