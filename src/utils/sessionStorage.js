export const getUserData = () => {
    const data = sessionStorage.getItem('auth');

    return {
        data: data ? JSON.parse(data) : undefined,
    };
};

export const getUserToken = () => {
    const token = sessionStorage.getItem('token');

    return {
        token: token ? token : undefined,
    };
};

export const isAuthenticated = () => {
    return sessionStorage.getItem('token') !== null;
};

export const setUserData = (data) => {
    sessionStorage.setItem('auth', JSON.stringify(data));
};

export const clearUserData = () => {
    sessionStorage.removeItem('auth');
    sessionStorage.removeItem('token');
};

//TODO - add more functions for token validation, etc.
