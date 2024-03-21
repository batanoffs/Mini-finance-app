import { notificationService } from "../../../../services/notificationService";
import { transactionService } from "../../../../services/transactionService";
import styles from "./notifications.module.css";

export const MoneyRequestNotification = ({
    formatDate,
    showMessage,
    notify,
    userDataId,
    token,
    setnotificationsState
}) => {
    const onTransactionApprove = async (e) => {
        const notificationElement = e.currentTarget.parentElement;
        if (!notificationElement) {
            showMessage("error", "Възникна грешка при изпращането");
            return;
        }
        const notificationId = notificationElement.getAttribute("data-key");
        if (!notificationId) {
            showMessage("error", "Възникна грешка при изпращането");
            return;
        }
        const requesterName = e.currentTarget.getAttribute("data-requester-name");
        if (!requesterName) {
            showMessage("error", "Възникна грешка при изпращането");
            return;
        }
        const amountStr = e.currentTarget.getAttribute("data-amount");
        if (!amountStr) {
            showMessage("error", "Възникна грешка при изпращането");
            return;
        }
        const amount = Number(amountStr);
        if (isNaN(amount)) {
            showMessage("error", "Възникна грешка при изпращането");
            return;
        }
        try {
            //TODO
            const response = await transactionService.sendMoney(requesterName, amount, "+", userDataId, token);
            if (response.success) {
                await notificationService.updateNotificationStatus(notificationId, "accepted", true, token);
                await notificationService.updateSeenStatus(notificationId, true, token);
                const getNotificationsResponse  = await notificationService.getNotifications(userDataId);
                await transactionService.notifyMoneyReceived(requesterName, amount, userDataId, token); // make new notification for transaction approved
                setnotificationsState(getNotificationsResponse);
                showMessage("success", "Изпращането е успешно");
            } 
        } catch (error) {
            console.error(error);
            showMessage("error", "Възникна грешка при изпращането");
        }
    };
 
    const onTransactionDecline = async (e) => {
        const notificationId = e.currentTarget.parentElement?.getAttribute("data-key");
        if (!notificationId) {
            console.error("Notification id is null");
            showMessage("error", "Възникна грешка при изпращането");
            return;
        }

        try {
            await notificationService.updateNotificationStatus(notificationId, "declined", true, token);
            const getNotificationsResponse  = await notificationService.getNotifications(userDataId);

            setnotificationsState(getNotificationsResponse);
            showMessage("error", "Транзакцията е отказана");
        } catch (error) {
            console.error(error);
            showMessage("error", "Възникна грешка при изпращането");
        }
    };

    return (
        <li
            className={styles.singleNotification}
            key={notify.objectId}
            data-key={notify.objectId}
        >
            <img
                className={styles.profileImage}
                src={notify.sender?.[0]?.avatar}
                alt="avatar"
            />
            <section className={styles.notificationContent}>
                <small>
                    {notify.sender?.[0]?.fullName ?? "Unknown"} поиска{" "}
                    <b style={{ color: "darkred" }}>
                        {notify.amount ?? "Unknown"}лв
                    </b>{" "}
                    от Вас
                </small>
                <small className={styles.date}> {formatDate(notify.created)}</small>
            </section>
            <button
                data-sender={`${notify.sender?.[0]?.objectId ?? ""}`}
                data-requester-name={notify.sender?.[0]?.fullName ?? "Unknown"}
                data-amount={notify.amount ?? "Unknown"}
                className={styles.btnAccept}
                onClick={onTransactionApprove}
            >
                изпрати
            </button>
            <button
                data-sender={`${notify.sender?.[0]?.objectId ?? ""}`}
                data-requester-name={notify.sender?.[0]?.fullName ?? "Unknown"}
                className={styles.btnRemove}
                onClick={onTransactionDecline}
            >
                откажи
            </button>
        </li>
    );
};
