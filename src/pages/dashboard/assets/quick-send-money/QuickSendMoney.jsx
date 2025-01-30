import { useState } from 'react';

import { Actions, ActionsMenu, AddToFavorites } from './assets';
import { useMessage, useModal } from '../../../../hooks';
import { useAuthContext } from '../../../../contexts/AuthContext';

import { ListFriend } from '../../../../components/lists';
import { EmptyCard } from '../../../../components/cards';
import { TransactionsModal } from '../../../../components/modals';

import styles from './quick-send.module.css';

export const QuickSendMoney = () => {
    const [values, setValues] = useState({ amount: '', friends: '' });
    const [showModal, toggleModal] = useModal({
        topUp: false,
        send: false,
        request: false,
        buttons: false,
        favFriends: false,
    });
    const { auth } = useAuthContext();
    const showMessage = useMessage();

    const notFound = (
        <>
            <p className={styles.notFound}>No friends added yet. Add friends below</p>
            <AddToFavorites toggleModal={toggleModal} />
        </>
    );
    const menu =
        auth?.favorite_friends?.length > 0 ? <ActionsMenu toggleModal={toggleModal} /> : null;

    const openSendMenu = (event) => {
        const name = event?.currentTarget?.parentElement?.getAttribute('data-key');
        if (!name) {
            showMessage(
                'error',
                'Error, can not get friend name. Please try again, or refresh page'
            );
            return;
        }
        toggleModal('send');
        setValues({ ...values, [`friends`]: name });
    };

    return (
        <EmptyCard options={{ menu }} title="Quick Send" color="accent">
            <ul className={styles.sendMoneyContainer}>
                {auth?.favorite_friends?.length > 0
                    ? auth.favorite_friends?.map((friend) => (
                          <ListFriend friend={friend} onClick={openSendMenu} key={friend.objectId}>
                              {showModal.send && (
                                  <Actions toggleModal={toggleModal} friend={friend} />
                              )}
                          </ListFriend>
                      ))
                    : notFound}
                {showModal.favFriends && <AddToFavorites toggleModal={toggleModal} />}
                {showModal.send && (
                    <TransactionsModal.Send showModal={showModal} toggleModal={toggleModal} />
                )}
            </ul>
        </EmptyCard>
    );
};
