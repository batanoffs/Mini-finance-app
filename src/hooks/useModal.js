export const useModal = () => {
    const [showModal, setShowModal] = useState({
        topUp: false,
        send: false,
        request: false,
    })

    const handleShowModal = (type) => () => {
        
        setShowModal({
            ...showModal,
            [type]: true,
        })
    }

    return [isModalOpen, openModal, closeModal, handleShowModal]
}
