import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuthContext } from '../../../contexts/AuthContext';
import { EmptyCard } from '../empty/EmptyCard';
import { ProfileAttributes } from './profile-attributes/ProfileAttributes';

import styles from './profile.module.css';

export const ProfileCard = () => {
    const { auth } = useAuthContext();

    const userAvatar = auth.avatar;
    const userElements = [
        ['Name', auth.fullName],
        ['Country', auth.country],
        ['Address', auth.address],
        ['Email', auth.email, 'mailto'],
        ['Phone', auth.phoneNumber, 'tel'],
        // TODO: add last login date
        // ['Last online', auth.lastOnline],
    ];

    return (
        <EmptyCard color="secondary" className={styles.customBlockProfile}>
            <div className={styles.customBlockProfileImageWrap}>
                <img
                    src={userAvatar}
                    className={styles.customBlockProfileImage}
                    alt="user avatar"
                />

                <Link to="/dashboard/settings" className={styles.customBlockEditIcon}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                </Link>
            </div>

            <ProfileAttributes styles={styles} userElements={userElements} />
        </EmptyCard>
    );
};
