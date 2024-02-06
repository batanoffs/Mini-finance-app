import { useState } from "react";
import { TopUp } from "./TopUpModal";
import { SendMoney } from "./SendModal";
import { ReceiveMoney } from "./ReceiveModal";

export const BankingActionButtons = () => {
    const [showTopUp, setShowTopUp] = useState(false);
    // const [showScan, setShowScan] = useState(false);
    const [showSend, setShowSend] = useState(false);
    const [showReceive, setShowReceive] = useState(false);

    return (
        <div className="custom-block custom-block-bottom" style={{ height: "60px"}}>
            
                
            <div className="custom-block-bottom-item">
                
                <a href="#" onClick={() => setShowTopUp(true)}>
                    <i className="custom-block-icon bi-wallet"></i>

                    <small>захрани</small>
                </a>
            </div>

            <div className="custom-block-bottom-item">
                <a href="#" onClick={() => setShowSend(true)}>
                    <i className="custom-block-icon bi-send"></i>

                    <small>изпрати</small>
                </a>
            </div>

            <div className="custom-block-bottom-item">
                <a href="#" onClick={() => setShowReceive(true)}>
                    <i className="custom-block-icon bi-arrow-down"></i>

                    <small>поискай</small>
                </a>
            </div>
            {showTopUp && <TopUp setShowTopUp={setShowTopUp} />}
            {/* {showScan && <TopUp setShowScan={setShowScan} />} */}
            {showSend && <SendMoney setShowSend={setShowSend} />}
            {showReceive && <ReceiveMoney setShowReceive={setShowReceive} />}
        </div>
    );
};
