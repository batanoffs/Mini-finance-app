import { API } from '../constants/apiKeys';
import * as request from '../utils/requester';

const login = async (data) => {
    // return await request.post(API.users.login, data);
    try {
        return await Backendless.UserService.login(data.login, data.password, true);
    } catch (error) {
        throw new Error(error);
    }
};

const validateSession = async (token) => {
    try {
        return await Backendless.UserService.isValidLogin();
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

const getAuthUserData = async (id) => {
    try {
        return await Backendless.Data.of('user-data').find({
            where: `ownerId='${id}'`,
            relations: ['virtualCard', 'friends', 'favorite_friends'],
            relationsDepth: 1,
        });
    } catch (error) {
        throw error;
    }
};

export const authService = {
    login,
    register,
    logout,
    resetPassword,
    validateSession,
    getAuthUserData,
};
