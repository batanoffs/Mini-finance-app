import * as request from './requester'
const baseURL = "https://lavishpart.backendless.app/api";
const endpoints = {
    login: "/users/login",
    register: "/users/register",
    logout: "/users/logout",
    authO: "/users/oauth/<providerCode>/request_url", // To Do implement AuthO hidden passowrd thirds API
}


const login = async (loginData) => {
    return await request.post(`${baseURL}${endpoints.login}`, loginData)
}

const logout = async (token) => {
    await request.get(`${baseURL}${endpoints.logout}`, token)
}

const register = async (registerData) => {
    return await request.post(`${baseURL}${endpoints.register}`, registerData)
}

export const authService = {
    login,
    register,
    logout,
}


// finance banking website design bento grid ux ui colours: #1678fb,#41a6d1,#a60067,#DC602E,#44464c,#ccdde2ff