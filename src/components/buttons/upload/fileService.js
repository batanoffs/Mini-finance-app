import * as request from '../../../utils/requester';
import { API } from '../../../constants/apiKeys';

const uploadProfilePicture = async (fileName, ownerId, file, token) => {
    const filePath = {
        fileURL: API.files.userData + `/${ownerId}/${fileName}`,
    };

    return await request.post(
        API.files.userData + `/${ownerId}/${fileName}?overwrite=true`,
        filePath,
        file,
        token
    );
};

const downloadFile = async (fileName, path) => {
    return await request.get(API.files.download + `/${path}/${fileName}`);
};

export const fileService = {
    uploadProfilePicture,
    downloadFile,
};
