import { useState } from 'react'

/**
 * useModal hook
 *
 * This hook manages the state of three modals: topUp, send, and request.
 *
 * @returns {Array} [showModal, handleShowModal]
 *   showModal: { topUp: boolean, send: boolean, request: boolean }
 *   handleShowModal: function(type: string) => void
 */

export const useModal = (initialState) => {
    const [showModal, setModalState] = useState(initialState)

    const toggleModal = (type) => {
        setModalState((prevState) => ({ ...prevState, [type]: !prevState[type] }))
    }

    return [showModal, toggleModal]
}
