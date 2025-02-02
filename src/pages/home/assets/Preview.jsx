import { PreviewSvg } from './PreviewSvg';

import styles from './preview.module.css';

export const Preview = () => {
    return (
        <div className={styles.previewContainer}>
            <PreviewSvg className={styles.previewSvg} />
        </div>
    );
};
