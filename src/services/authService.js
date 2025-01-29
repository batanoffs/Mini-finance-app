import { API } from '../constants/apiKeys';
import * as request from '../utils/requester';

const login = async (data) => {
    // return await request.post(API.users.login, data);
    try {
        const response = await Backendless.UserService.login(data.login, data.password, true);
        return response;
    } catch (error) {
        throw new Error(error);
    }
};

const logout = async (token) => {
    // return await request.get(API.users.logout, token);
    try {
        return await Backendless.UserService.logout(token);
    } catch (error) {
        throw new Error(error);
    }
};

const register = async (data) => {
    // return await request.post(API.users.register, data);
    try {
        return await Backendless.UserService.register(data);
    } catch (error) {
        throw new Error(error);
    }
};

const resetPassword = async (email) => {
    // const encodedEmail = encodeURIComponent(email);
    // return await request.get(API.users.restorePassword + encodedEmail);
    try {
        return await Backendless.UserService.restorePassword(email);
    } catch (error) {
        throw new Error(error);
    }
};

export const authService = {
    login,
    register,
    logout,
    resetPassword,
};
