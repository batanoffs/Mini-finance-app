const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const EXCHANGE_RATE_BASE_URL = import.meta.env.VITE_EXCHANGE_BASE_URL;
const FILE_BASE_URL = import.meta.env.VITE_API_FILE_BASE_URL;
const APPLICATION_ID = import.meta.env.VITE_APP_APPLICATION_ID;
const REST_API_KEY = import.meta.env.VITE_APP_REST_API_KEY;

export const API = {
    data: {
        transactions: BASE_URL + '/data/transaction/unit-of-work',
        moneyTransactions: BASE_URL + '/data/MoneyTransactions',
        cardsMockData: BASE_URL + '/data/CardsMockData',
        userData: BASE_URL + '/data/UserData',
        userNotifications: BASE_URL + '/data/UserNotifications',
    },
    users: {
        login: BASE_URL + '/users/login',
        register: BASE_URL + '/users/register',
        logout: BASE_URL + '/users/logout',
        restorePassword: BASE_URL + '/users/restorepassword/',
    },
    files: {
        userData: BASE_URL + '/files/app/UserData',
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

// LOGIN: BASE_URL + '/users/login',
// LOGOUT: BASE_URL + '/users/logout',
// REGISTER: BASE_URL + '/users/register',
// RESET_PASSWORD: (email) => BASE_URL + '/users/restorepassword/' + email,
// USERS: BASE_URL + '/data/UserData',
// NOTIFICATIONS: BASE_URL + '/data/UserNotifications',
// MOCK_CREDIT_CARDS: BASE_URL + '/data/CardsMockData',
// MONEY: BASE_URL + '/data/MoneyTransactions',
// TRANSACTION: BASE_URL + '/transaction/unit-of-work',
// DATA_TRANSACTION: BASE_URL + '/data/transaction/unit-of-work',
// FILES: {
//     USER: BASE_URL + '/files/app/UserData',
//     DOWNLOAD: FILE_BASE_URL + APPLICATION_ID + REST_API_KEY + '/files/',
// },
