import { useContext } from 'react'

import { AuthContext } from '../../../contexts/AuthContext'
import { useUploadImage } from './useUploadImage'

import styles from './upload.module.css'

export const UploadPicture = () => {
    const { handleDrop, handleDragOver, handleFileSelect, error } = useUploadImage()
    const { auth } = useContext(AuthContext)

    return (
        <div className={styles.container} onDrop={handleDrop} onDragOver={handleDragOver}>
            <img className={styles.image} src={auth.avatar} alt="avatar" />
            <input type="file" onChange={handleFileSelect} />

            {error && <div className={styles.error}>{error}</div>}

            <p>Drag and drop your image here or select from the button</p>
        </div>
    )
}
