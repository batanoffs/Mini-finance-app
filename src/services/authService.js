import * as request from './requester'
const baseURL = "https://lavishpart.backendless.app/api";
const endpoints = {
    login: "/users/login",
    register: "/users/register",
}

const login = async (loginData) => {
    return await request.post(`${baseURL}${endpoints.login}`, loginData)
}

const register = async (registerData) => {
    return await request.post(`${baseURL}${endpoints.register}`, registerData)
}

export const authService = {
    login,
    register
}