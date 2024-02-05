import * as request from './requester'

const baseURL = "https://lavishpart.backendless.app/api";
const endpoints = {
    userData: (id) => `/data/UserData?where=ownerId='${id}'&loadRelations=virtualcard%2Cfriends`,
    setUserData: `/data/UserData`,
    mockCardObjectId: (id) => `/data/cardsMockData?where=id=${id}`,
}

const filePathURL = (path, fileName) => `https://eu.backendlessappcontent.com/7E8BB132-A50E-1B4C-FFFA-B07295175E00/CB78EA12-92CA-45CA-89DE-A8109442A370/files/${path}/${fileName}`;
const uploadURL = (path, fileName, overwrite) => `https://lavishpart.backendless.app/api/files/${path}/${fileName}?overwrite=${overwrite}`;

// GET USER PROFILE PICTURE
const uploadProfilePicture = async (fileName, token) => {
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

const getUserData = async (id) => {
    return await request.get(baseURL + endpoints.userData(id));    
}

const setUserData = async (userData) => {
    return await request.post(`${baseURL}${endpoints.setUserData}`, userData)
}

const getMockCardObjectId = async (id) => {
    return await request.get(baseURL + endpoints.mockCardObjectId(id));
}

export const dataService = {
    uploadProfilePicture,
    getUserData,
    setUserData,
    getMockCardObjectId
}