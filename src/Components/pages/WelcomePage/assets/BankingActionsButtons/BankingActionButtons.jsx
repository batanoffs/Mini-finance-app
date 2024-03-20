import { TopUp } from "./TopUpModal";
import { SendMoney } from "./SendModal";
import { RequestMoney } from "./RequestModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVault, faMoneyBillTransfer, faHandHoldingDollar} from "@fortawesome/free-solid-svg-icons";
import blocks from "../../custom-block.module.css";

export const BankingActionButtons = ({userInput, setUserInput, showModal, setShowModal}) => {
    const handleShowModal = (type) => () => {
        setShowModal({
            ...showModal,
            [type]: true,
        });
    };

    return (
        <div
            className={`${blocks.customBlock} ${blocks.customBlockBottom}`}
            style={{ maxHeight: "85px" }}
        >
            <FontAwesomeIcon
                className={blocks.customBlockIcon}
                data-text="Top up"
                icon={faVault}
                onClick={handleShowModal("topUp")}
            />

            <FontAwesomeIcon
                className={blocks.customBlockIcon}
                data-text="Send money"
                icon={faMoneyBillTransfer}
                onClick={handleShowModal("send")}
            />

            <FontAwesomeIcon
                className={blocks.customBlockIcon}
                data-text="Request money"
                icon={faHandHoldingDollar}
                onClick={handleShowModal("request")}
            />
            
            {showModal.topUp && <TopUp showModal={showModal} setShowModal={setShowModal} />}
            {showModal.send && <SendMoney userInput={userInput} setUserInput={setUserInput} showModal={showModal} setShowModal={setShowModal} />}
            {showModal.request && <RequestMoney userInput={userInput} setUserInput={setUserInput} showModal={showModal} setShowModal={setShowModal} />}
        </div>
    );
};

