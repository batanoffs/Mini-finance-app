import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

import styles from './actions-menu.module.css';

export const ActionsMenu = ({ toggleEditMode, toggleAddMode, favoriteFriends }) => {
    if (!favoriteFriends?.length) return null;

    const onEditHandler = (e) => {
        const menuElement = e.currentTarget.parentElement;
        const divElement = e.currentTarget.parentElement.parentElement;
        menuElement.style.display = menuElement.style.display === 'block' ? 'none' : 'block';
        divElement.style.display = divElement.style.display === 'block' ? 'none' : 'block';
        toggleEditMode((prev) => !prev);
    };

    const openMenuHandler = (e) => {
        const tooltip = e.currentTarget.nextElementSibling;
        const ul = e.currentTarget.nextElementSibling.children[0];
        ul.style.display = ul.style.display === 'block' ? 'none' : 'block';
        tooltip.style.display = tooltip.style.display === 'block' ? 'none' : 'block';
    };

    const onAddHandler = (e) => {
        toggleAddMode((prev) => !prev);
        const menuElement = e.currentTarget.parentElement;
        const divElement = e.currentTarget.parentElement.parentElement;
        divElement.style.display = divElement.style.display === 'block' ? 'none' : 'block';
        menuElement.style.display = menuElement.style.display === 'block' ? 'none' : 'block';
    };
    return (
        <>
            <FontAwesomeIcon
                icon={faEllipsisV}
                className={styles.threeDotsIcon}
                onClick={openMenuHandler}
            />

            <div className={styles.actionButtons}>
                <ul>
                    <li className={styles.actionButton} onClick={onEditHandler}>
                        Edit list
                    </li>
                    <li className={styles.actionButton} onClick={onAddHandler}>
                        Add more
                    </li>
                </ul>
            </div>
        </>
    );
};
