export const formState = {
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    gender: '',
    country: '',
    phoneNumber: 0,
    address: '',
    town: '',
    termsAccept: false,
};

export const formRegex = {
    fullName: /^[a-zA-Zа-яА-Я]{2,} [a-zA-Zа-яА-Я]{2,}$/,
    cardnumber:
        /^((?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12})|(4[0-9]{12}(?:[0-9]{3})?)$/,
    expiry: /^((0[1-9])|(1[0-2]))\/([0-9]{2}|[1-9][0-9])$/,
    cvv: /^\d{3,4}$/,
    email: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    firstName: /^[a-zA-Zа-яА-Я]{2,30}$/,
    lastName: /^[a-zA-Zа-яА-Я]{2,30}$/,
    country: /^[a-zA-Zа-яА-Я]{3,30}$/,
    town: /^[a-zA-Zа-яА-Я]{3,30}$/,
    phoneNumber: /08[7-9][0-9]{7}/,
    username: /^[a-zA-Z0-9-]{3,16}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
    termsAccept: /^(true)$/,
};

export const errorMessages = {
    email: 'only letters, numbers, symbols ._%+ and @',
    termsAccept: 'You have not confirmed the terms',
    firstName: 'at least 2 characters',
    lastName: 'at least 2 characters',
    country: 'at least 3 characters',
    town: 'at least 3 characters',
    phoneNumber: 'invalid number',
    username: '3-16 characters, -, a-z, A-Z',
    password: 'uppercase and lowercase letters, numbers, over 8 characters',
    confirmPassword: 'passwords do not match',
    iban: 'only letters and numbers, 16 characters',
    expiry: 'date format MM/YY',
    cvv: 'only 3 or 4 numbers',
    swift: 'only letters and numbers, 4-5 characters',
    bank: 'only letters and numbers, up to 30 characters',
    description: 'only letters and numbers, 2-30 characters',
    cardnumber: 'card number must be 16 digits',
    fullName: 'only letters, first and last name',
};

// const validateEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
// const validateUsername = /^[a-zA-Z0-9-]{3,16}$/;
// const validatePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
// const validatePhone = /08[7-9][0-9]{7}/;
// const validateName = /^[a-zA-Zа-яА-Я]{2,30}$/;
// const validateCityCountry = /^[a-zA-Zа-яА-Я]{3,30}$/;
// const validateExpiry = /^((0[1-9])|(1[0-2]))\/([0-9]{2}|[1-9][0-9])$/;
// const validateTerms = /^(true)$/;
// const validateCVV = /^\d{3,4}$/;
// const validateCardNumber =
//     /^((?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12})|(4[0-9]{12}(?:[0-9]{3})?)$/;
// const validateFullname = /^[a-zA-Zа-яА-Я]{2,} [a-zA-Zа-яА-Я]{2,}$/;
