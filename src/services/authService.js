import { API } from '../constants/apiKeys';
import * as request from '../utils/requester';

const login = async (data) => {
    return await request.post(API.users.login, data);
};

const logout = async (token) => {
    return await request.get(API.users.logout, token);
};

const register = async (data) => {
    return await request.post(API.users.register, data);
};

const resetPassword = async (email) => {
    const encodedEmail = encodeURIComponent(email);
    return await request.get(API.users.restorePassword + encodedEmail);
};

export const authService = {
    login,
    register,
    logout,
    resetPassword,
};
