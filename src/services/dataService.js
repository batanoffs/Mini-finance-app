import * as request from './requester'

const baseURL = "https://lavishpart.backendless.app/api";
const endpoints = {
    userData: (id) => `/data/UserProfile?ownerId=${id}&loadRelations=creditCard%2Cfriends%2Ctransactions`,
    
}

export const filePathURL = (path, fileName) => `https://eu.backendlessappcontent.com/7E8BB132-A50E-1B4C-FFFA-B07295175E00/CB78EA12-92CA-45CA-89DE-A8109442A370/files/${path}/${fileName}`;
const uploadURL = (path, fileName, overwrite) => `https://lavishpart.backendless.app/api/files/${path}/${fileName}?overwrite=${overwrite}`;

export const uploadProfilePicture = async (fileName, token) => {
    const response = await fetch(uploadURL("userData/profile/picture", fileName, false), {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
            "user-token": `${token}`
        },
        body: {
            "fileURL": `${filePathURL("userData/profile/picture", fileName)}`
        }
    });

    if (response.status === 204) {
        return {};
    }

    if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message);
        
    }
    const result = await response.json();
    return result;
}

export const getUserData = async (userId) => {
    return await request.get(baseURL + endpoints.userData(userId));    
}