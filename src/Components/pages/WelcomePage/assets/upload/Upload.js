import { useContext, useState } from "react";
import { AuthContext } from "../../../../../contexts/AuthContext";
import { dataService } from "../../../../../services/userDataService";

export const UploadPicture = () => {
    const [error, setError] = useState(null);
    const { ownerId, token } = useContext(AuthContext);

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        handleFile(file);
    };

    const handleFile = async (file) => {
        const MAX_FILE_SIZE = 5 * 1024 * 1024;
        if (file.type !== "image/jpeg" && file.type !== "image/png") {
            setError("Файлът трябва да е JPEG или PNG!");
            return;
        }
        if (file.size > MAX_FILE_SIZE) {
            setError("Максимален размер 5 MB на файла!");
            return;
        }

        setError(null);
        const response = await dataService.uploadProfilePicture(
            "avatar",
            ownerId,
            file,
            token,
            true
        );
        console.log(response);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        handleFile(file);
    };

    return (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            style={{
                border: "1px dashed grey",
                borderRadius: "1em",
                padding: "1em",
                textAlign: "center",
                marginBottom: "1em",
                marginLeft: "1em",
            }}
        >
            <input type="file" onChange={handleFileSelect} />
            {error && <div style={{ color: "red" }}>{error}</div>}
            <p>Drag and drop your picture here, or click to select a file</p>
        </div>
    );
};
