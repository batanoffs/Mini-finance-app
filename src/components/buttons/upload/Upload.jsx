import { useUploadImage } from '../../../hooks/useUploadImage'
import styles from './upload.module.css'

export const UploadPicture = () => {
    const [handleDrop, handleDragOver, handleFileSelect, error, picture] = useUploadImage()

    return (
        <div className={styles.container} onDrop={handleDrop} onDragOver={handleDragOver}>
            <img className={styles.image} src={picture} alt="person" />
            <input type="file" onChange={handleFileSelect} />

            {error && <div className={styles.error}>{error}</div>}

            <p>Drag and drop your image here or select from the button</p>
        </div>
    )
}
