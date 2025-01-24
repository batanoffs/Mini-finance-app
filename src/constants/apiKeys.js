const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const EXCHANGE_RATE_BASE_URL = import.meta.env.VITE_EXCHANGE_BASE_URL;
const FILE_BASE_URL = import.meta.env.VITE_API_FILE_BASE_URL;
const APPLICATION_ID = import.meta.env.VITE_APP_APPLICATION_ID;
const REST_API_KEY = import.meta.env.VITE_APP_REST_API_KEY;

export const API = {
    data: {
        apiTransaction: BASE_URL + '/data/transaction/unit-of-work',
        cashTransactions: BASE_URL + '/data/cash-transactions',
        cardsMockData: BASE_URL + '/data/mock-cards',
        friendRequests: BASE_URL + '/data/friend-requests',
        userData: BASE_URL + '/data/user-data',
        notifications: BASE_URL + '/data/notifications',
    },
    users: {
        login: BASE_URL + '/users/login',
        register: BASE_URL + '/users/register',
        logout: BASE_URL + '/users/logout',
        restorePassword: BASE_URL + '/users/restorepassword/',
    },
    files: {
        userData: BASE_URL + '/files/app/user-data',
        download: FILE_BASE_URL + APPLICATION_ID + REST_API_KEY + '/files/',
    },
    transaction: {
        unit_of_work: BASE_URL + '/transaction/unit-of-work',
    },
    rates: {
        pair: EXCHANGE_RATE_BASE_URL + '/pair/',
        latest: EXCHANGE_RATE_BASE_URL + '/latest/',
    },
    // ToDo implement AuthO hidden password thirds API
    // authO: '/users/oauth/<providerCode>/request_url'
};
