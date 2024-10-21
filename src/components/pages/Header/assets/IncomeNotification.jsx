import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'

import { formatDate } from '../../../../utils/formatDate'

import styles from './notifications.module.css'

export const IncomeNotification = ({ notify, deleteNotificationHandler }) => {
    return (
        <li className={styles.singleNotification} key={notify.objectId} data-key={notify.objectId}>
            <section className={styles.notificationContent}>
                <small>
                    Received <b style={{ color: 'green' }}>{notify.amount ?? 'Unknown'}BGN</b> from{' '}
                    {notify.sender?.[0]?.fullName ?? 'Unknown'}
                </small>
                <small className={styles.date}> {formatDate(notify.created)}</small>
            </section>
            <button
                type="button"
                data-key={notify.objectId}
                className={styles.btnRemove}
                onClick={deleteNotificationHandler}
                defaultValue={'Delete'}
            >
                <FontAwesomeIcon icon={faTrashAlt} />
            </button>
        </li>
    )
}

