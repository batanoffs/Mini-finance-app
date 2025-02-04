import { useState } from 'react';

import { Actions, ActionsMenu, AddToFavorites } from './assets';
import { useMessage, useModal } from '../../../../hooks';
import { useAuthContext } from '../../../../contexts/AuthContext';

import { ListFriend } from '../../../../components/lists';
import { EmptyCard } from '../../../../components/cards';
import { TransactionsModal } from '../../../../components/modals';
import { getUserToken } from '../../../../utils';

import styles from './quick-send.module.css';

export const QuickSendMoney = () => {
    const [values, setValues] = useState({ amount: '', friends: '' });
    const [showMenu, setShowMenu] = useState(false);
    const [showModal, setShowModal] = useModal({ send: false, buttons: false, favFriends: false });
    const { auth } = useAuthContext();
    const { token } = getUserToken();
    const showMessage = useMessage();

    const notFound = (
        <>
            <p className={styles.notFound}>No friends added yet. Add friends below</p>
            <AddToFavorites toggleModal={setShowModal} />
        </>
    );
    const menu =
        auth?.favorite_friends?.length > 0 ? (
            <ActionsMenu toggleModal={setShowModal} showMenu={showMenu} setShowMenu={setShowMenu} />
        ) : null;

    const openSendMenu = (name) => {
        if (!name) {
            showMessage('error', 'Can not get friend name. Please try again, or refresh page');
            return;
        }
        setShowModal('send');
        setValues({ ...values, [`friends`]: name });
    };

    return (
        <EmptyCard options={{ menu }} title="Quick Send" color="accent">
            <ul className={styles.sendMoneyContainer}>
                {auth?.favorite_friends?.length > 0
                    ? auth.favorite_friends?.map((friend) => (
                          <ListFriend
                              friend={friend}
                              onClick={() => openSendMenu(friend?.fullName)}
                              key={friend.objectId}
                          >
                              {showModal.send && (
                                  <Actions toggleModal={setShowModal} friend={friend} />
                              )}
                          </ListFriend>
                      ))
                    : notFound}
                {showModal.favFriends && <AddToFavorites toggleModal={setShowModal} />}
                {showModal.send && (
                    <TransactionsModal.Send
                        showModal={showModal}
                        setShowModal={setShowModal}
                        userId={auth.objectId}
                        userFullName={auth.fullName}
                        token={token}
                        showMessage={showMessage}
                    />
                )}
            </ul>
        </EmptyCard>
    );
};
