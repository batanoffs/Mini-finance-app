import { useContext, useState } from 'react'

import { AuthContext } from '../contexts/AuthContext'
import { dataService } from '../services'
import { MAX_FILE_SIZE } from '../constants'
import { getUserToken } from '../utils'

export const useUploadImage = () => {
    const [error, setError] = useState(null)
    const { setAuth, auth } = useContext(AuthContext)
    const { token } = getUserToken();


    const handleDrop = (e) => {
        e.preventDefault()
        const file = e.dataTransfer.files[0]
        handleFile(file)
    }

    const handleFile = async (file) => {
        if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
            setError('File type must be JPEG or PNG!')
            return
        }
        if (file.size > MAX_FILE_SIZE) {
            setError('Max file size 5MB!')
            return
        }

        setError(null)

        const fineName = file.name.split('.')[0]
        const response = await dataService.uploadProfilePicture(fineName, auth.ownerId, file, token)

        const data = {
            avatar: response.fileURL,
        }

        const avatarResponse = await dataService.changeAttribute(auth.objectId, data)

        if (avatarResponse) {
            setAuth((state) => ({ ...state, avatar: avatarResponse.avatar }))
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault()
    }

    const handleFileSelect = (e) => {
        const file = e.target.files[0]
        handleFile(file)
    }

    return { handleDrop, handleDragOver, handleFileSelect, error }
}
