import { encodeURIComponent } from 'querystring';
import { API } from '../constants/baseUrl'
import * as request from './requester'

const login = async (data) => {
    return await request.post(API.LOGIN, data)
}

const logout = async (token) => {
    return await request.get(API.LOGOUT, token)
}

const register = async (data) => {
    return await request.post(API.REGISTER, data)
}

const resetPassword = async (email) => {
    const encodedEmail = encodeURIComponent(email);
    return await request.get(API.RESET_PASSWORD(encodedEmail));
}

export const authService = {
    login,
    register,
    logout,
    resetPassword
}
