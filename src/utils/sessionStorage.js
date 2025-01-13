export const getUserData = () => {
    const data = sessionStorage.getItem('auth')
    const token = sessionStorage.getItem('token')

    return {
        data: data ? JSON.parse(data) : undefined,
        token: token ? token : undefined,
    }
}

export const setUserData = (data) => {
    sessionStorage.setItem('auth', JSON.stringify(data))
}

export const clearUserData = () => {
    sessionStorage.removeItem('auth')
    sessionStorage.removeItem('token')
}

//TODO - add more functions for token validation, etc.
