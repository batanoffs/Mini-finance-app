const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const EXCHANGE_RATE_BASE_URL = import.meta.env.VITE_EXCHANGE_BASE_URL;
const FILE_BASE_URL = import.meta.env.VITE_API_FILE_BASE_URL;

const APPLICATION_ID = import.meta.env.VITE_APP_APPLICATION_ID;
const REST_API_KEY = import.meta.env.VITE_APP_REST_API_KEY;

export const API = {
    LOGIN: BASE_URL + '/users/login',
    LOGOUT: BASE_URL + '/users/logout',
    REGISTER: BASE_URL + '/users/register',
    RESET_PASSWORD: (email) => BASE_URL + '/users/restorepassword/' + email,
    USERS: BASE_URL + '/data/UserData',
    NOTIFICATIONS: BASE_URL + '/data/UserNotifications',
    MOCK_CREDIT_CARDS: BASE_URL + '/data/CardsMockData',
    MONEY: BASE_URL + '/data/MoneyTransactions',
    TRANSACTION: BASE_URL + '/transaction/unit-of-work',
    DATA_TRANSACTION: BASE_URL + '/data/transaction/unit-of-work',
    FILES: {
        USER: BASE_URL + '/files/app/UserData',
        DOWNLOAD: FILE_BASE_URL + APPLICATION_ID + REST_API_KEY + '/files/',
    },
};

export const API_CURRENCY_RATE = {
    PAIR: EXCHANGE_RATE_BASE_URL + '/pair/',
    LATEST: EXCHANGE_RATE_BASE_URL + '/latest/',
};

// authO: '/users/oauth/<providerCode>/request_url', // To Do implement AuthO hidden passowrd thirds API
