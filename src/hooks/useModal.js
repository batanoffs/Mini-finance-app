import { useState } from 'react'

export const useModal = () => {
    const [showModal, setShowModal] = useState({
        topUp: false,
        send: false,
        request: false,
    })

    const handleShowModal = (type) => () =>
        setShowModal({
            ...showModal,
            [type]: !showModal[type],
        })

    return [showModal, setShowModal, handleShowModal]
}
