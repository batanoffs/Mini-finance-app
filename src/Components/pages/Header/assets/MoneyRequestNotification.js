import { notifications } from "../../../../services/notificationService";
import { dataService } from "../../../../services/userDataService";
import { AuthContext } from "../../../../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import { App } from "antd";
import styles from "./notifications.module.css";

export const MoneyRequestNotification = ({ formatDate, showMessage,notify }) => {
    const onTransactionApprove = async (e) => {
        const parentElement =
            e.currentTarget.parentElement.parentElement.parentElement;
        const notificationId =
            parentElement && parentElement.getAttribute("data-key");
        try {
            //TODO
            console.log("Transaction approved!");
            showMessage("success", "Транзакцията е потвърдена");
        } catch (error) {
            console.log(error);
        }
    };

    const onTransactionDecline = async (e) => {
        const parentElement =
            e.currentTarget.parentElement.parentElement.parentElement;
        const notificationId =
            parentElement && parentElement.getAttribute("data-key");
        try {
            //TODO
            console.log("Transaction declined!");
            showMessage("error", "Транзакцията е отхвърлена");
        } catch (error) {
            console.log(error);
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
            <small>
                {notify.sender?.[0]?.fullName ?? "Unknown"}{" "}
                поиска{" "}
                <b style={{ color: "darkred" }}>
                    {notify.amount ?? "Unknown"}лв
                </b>{" "}
                от Вас
            </small>
            <input
                data-sender={`${
                    notify.sender?.[0]?.objectId ?? ""
                }`}
                type="button"
                className={styles.btnRemove}
                onClick={onTransactionApprove}
                defaultValue={"изпрати"}
            />
            <input
                data-sender={`${
                    notify.sender?.[0]?.objectId ?? ""
                }`}
                type="button"
                className={styles.btnRemove}
                onClick={onTransactionDecline}
                defaultValue={"откажи"}
            />
        </li>
    )
}