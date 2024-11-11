import { useState } from 'react'

/**
 * useModal hook
 *
 * This hook manages the state of modals with initialState passed as prop.
 *
 * @returns {Array} [showModal, toggleModal]
 *   showModal: initialState
 *   toggleModal: function(type: string) => void
 */

export const useModal = (initialState) => {
    const [showModal, setModalState] = useState(initialState)

    const toggleModal = (type) => {
        setModalState((prevState) => {
            return { ...prevState, [type]: !prevState[type] }
        })
    }

    return [showModal, toggleModal]
}
