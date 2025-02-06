import { useAuthContext } from '../../../../../../../contexts/AuthContext';
import { NOTIFICATION } from '../constants';

import styles from './render-message.module.css';

export const RenderMessage = ({
    message,
    related_entity_id,
    related_entity_name,
    userId,
    created,
    type,
    is_seen,
    objectId,
}) => {
    // <img className={styles.profileImage} src={avatar} alt="avatar" /> 

    return <small>{message}</small>;
};
