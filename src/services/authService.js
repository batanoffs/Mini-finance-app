import { API } from '../constants/baseUrl'
import * as request from './requester'

const login = async (data) => {
    return await request.post(API.LOGIN, data)
}

const logout = async (token) => {
    await request.get(API.LOGOUT, token)
}

const register = async (data) => {
    return await request.post(API.REGISTER, data)
}

export const authService = {
    login,
    register,
    logout,
}
