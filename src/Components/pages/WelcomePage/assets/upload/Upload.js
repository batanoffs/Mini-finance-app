import { useContext, useState } from "react";
import { AuthContext } from "../../../../../contexts/AuthContext";
import { dataService } from "../../../../../services/userDataService";
import blocks from "../../custom-block.module.css";

export const UploadPicture = () => {
    const [error, setError] = useState(null);
    const { ownerId, token, userDataId, picture, setAvatar } =
        useContext(AuthContext);

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
            setError("Максимален размер 5 MB!");
            return;
        }

        // RESET ERROR
        setError(null);

        // Upload file
        const fineName = file.name.split(".")[0];
        const response = await dataService.uploadProfilePicture(
            fineName,
            ownerId,
            file,
            token
        );

        console.table(response);
        console.log(userDataId);
        const data = {
            avatar: response.fileURL,
        };

        const avatarResponse = await dataService.changeAttribute(
            userDataId,
            data
        );

        if (avatarResponse) {
            setAvatar(avatarResponse.avatar);
        }
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
            <img
                src={picture}
                className={blocks.customBlockProfileImage}
                alt="person"
            />
            <input type="file" onChange={handleFileSelect} />
            {error && <div style={{ color: "red" }}>{error}</div>}
            <p>Провлачете вашето изображение тук или изберете от бутона</p>
        </div>
    );
};
