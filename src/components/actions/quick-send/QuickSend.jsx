import { useContext, useState } from 'react'

import { ActionsMenu } from './ActionsMenu'
import { AddToFavorites } from './AddFavourites'
import { Actions } from './Actions'
import { useMessage } from '../../../hooks/useMessage'
import { AuthContext } from '../../../contexts/AuthContext'

import containers from '../../../pages/dashboard/assets/containers.module.css'
import styles from './quicksend.module.css'

export const QuickSendMoney = ({ showModal, setShowModal, userInput, setUserInput }) => {
    const [showFavorites, setShowFavorites] = useState(false)
    const [showBtns, setShowBtns] = useState(false)
    const { favorites } = useContext(AuthContext)
    const showMessage = useMessage()

    const openSendMenu = (event) => {
        const name = event.currentTarget.parentElement.getAttribute('data-key')
        if (!name) {
            showMessage('error', 'An error occurred, please try again')
            return
        }
        setShowModal({ ...showModal, [`send`]: true })
        setUserInput({ ...userInput, [`friends`]: name })
    }

    const showActionsHandler = (e) => {
        const tooltip = e.currentTarget.nextElementSibling
        const ul = e.currentTarget.nextElementSibling.children[0]
        ul.style.display = ul.style.display === 'block' ? 'none' : 'block'
        tooltip.style.display = tooltip.style.display === 'block' ? 'none' : 'block'
    }

    const closeMenuHandler = (e) => {
        e.currentTarget.style.display = e.currentTarget.style.display === 'block' ? 'none' : 'block'
    }

    const showFavoritesHandler = () => {
        if (favorites.length === 0) {
            return
        }
        setShowFavorites(!showFavorites)
    }

    return (
        <div className={`${containers.customBlock} ${containers.primaryBg}`}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h5 style={{ color: 'var(--section-bg-color)' }}>Quick send</h5>
                {favorites.length > 0 ? (
                    <ActionsMenu
                        setShowBtns={setShowBtns}
                        showActionsHandler={showActionsHandler}
                        showFavoritesHandler={showFavoritesHandler}
                    />
                ) : null}
            </div>

            <ul className={containers.sendMonkeyContainer}>
                {favorites.length > 0 ? (
                    favorites?.map((friend) => (
                        <li
                            key={friend.objectId}
                            data-key={friend.fullName}
                            style={{ position: 'relative' }}
                        >
                            <img
                                src={friend.avatar}
                                className={styles.profileImage}
                                data-key={friend.fullName}
                                alt={'avatar'}
                                onClick={openSendMenu}
                            />
                            {showBtns && (
                                <Actions
                                    setShowBtns={setShowBtns}
                                    friend={friend}
                                    closeMenuHandler={closeMenuHandler}
                                />
                            )}
                        </li>
                    ))
                ) : (
                    <>
                        <p style={{ display: 'inline', fontStyle: 'italic', color: '#eee' }}>
                            You don't have friends in the list
                        </p>
                        <AddToFavorites setShowFavorites={setShowFavorites} />
                    </>
                )}
                {showFavorites && <AddToFavorites setShowFavorites={setShowFavorites} />}
            </ul>
        </div>
    )
}
