import { useState } from 'react';

import { Actions, ActionsMenu, AddToFavorites, FriendItem, SendForm } from './components';
import { useMessage } from '../../../../hooks';
import { useAuthContext } from '../../../../contexts/AuthContext';
import { EmptyCard } from '../../../../components/cards';
import { ModalForm } from '../../../../components/modals';

import styles from './quick-send.module.css';

export const QuickSendMoney = () => {
    // Modal state
    const [isAddMode, setAddMode] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    const [isSendOpen, setSendOpen] = useState(false);

    // Form state
    const [receiver, setReceiver] = useState({ name: '', id: '', avatar: '' });

    const { auth } = useAuthContext();
    const showMessage = useMessage();

    const openSendMenu = (favoriteFriend) => {
        if (!favoriteFriend.fullName || !favoriteFriend.objectId || !favoriteFriend.avatar) {
            showMessage('error', 'Can not get friend data. Please try again, or refresh page');
            return;
        }

        setSendOpen(true);
        setReceiver({
            name: favoriteFriend.fullName,
            id: favoriteFriend.objectId,
            avatar: favoriteFriend.avatar,
        });
    };

    const favoriteFriends = auth?.favorite_friends;

    if (!favoriteFriends.length)
        return (
            <EmptyCard title="Quick Send" color="accent">
                <p className={styles.notFound}>No friends added yet. Add friends below</p>
                <AddToFavorites toggleModal={setAddMode} />
            </EmptyCard>
        );

    return (
        <>
            <EmptyCard
                title="Quick Send"
                color="accent"
                overflow="visible"
                options={{
                    menu: (
                        <ActionsMenu
                            favoriteFriends={favoriteFriends}
                            toggleEditMode={setEditMode}
                            toggleAddMode={setAddMode}
                        />
                    ),
                }}
            >
                <ul className={styles.sendMoneyContainer}>
                    {favoriteFriends.map((friend) => (
                        <FriendItem
                            friend={friend || null}
                            onClick={() => openSendMenu(friend)}
                            key={friend.objectId}
                        >
                            {isEditMode && <Actions setEditMode={setEditMode} friend={friend} />}
                        </FriendItem>
                    ))}
                </ul>
                {isAddMode && <AddToFavorites setAddMode={setAddMode} />}
            </EmptyCard>

            <ModalForm isVisible={isSendOpen} setVisible={setSendOpen} title={'Quick Send Money'}>
                <SendForm
                    userId={auth.objectId}
                    userFullName={auth.fullName}
                    receiver={receiver}
                    setShowModal={setSendOpen}
                />
            </ModalForm>
        </>
    );
};
