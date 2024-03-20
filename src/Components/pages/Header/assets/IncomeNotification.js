import styles from "./notifications.module.css";

export const IncomeNotification = ({ notify, formatDate, deleteNotificationHandler }) => {
    return (
        <li
            className={styles.singleNotification}
            key={notify.objectId}
            data-key={notify.objectId}
        >
            <small>
                Получихте{" "}
                <b style={{ color: "green" }}>
                    {notify.amount ?? "Unknown"}лв
                </b>{" "}
                от{" "}
                {notify.sender?.[0]?.fullName ?? "Unknown"}
            </small>
            <small> {formatDate(notify.created)}</small>
            <input
                type="button"
                data-key={notify.objectId}
                className={styles.btnRemove}
                onClick={deleteNotificationHandler}
                defaultValue={"Изтриване"}
            />
        </li>
    )
};