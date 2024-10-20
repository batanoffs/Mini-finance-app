import { useState } from 'react'

export const useValidate = (initialState) => {
    const [error, setErrors] = useState(initialState)

    const errorHandler = (e) => {
        const newErrors = { ...error }
        const validateEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        const validateUsername = /^[a-zA-Z0-9-]{3,16}$/gm
        const validatePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/gm
        const validatePhone = /08[7-9][0-9]{7}/gm
        const validateName = /^[a-zA-Zа-яА-Я]{2,30}$/gm
        const validateCityCountry = /^[a-zA-Zа-яА-Я]{3,30}$/gm
        const validateExpiry = /^((0[1-9])|(1[0-2]))\/([0-9]{2}|[1-9][0-9])$/
        const validateCVV = /^\d{3,4}$/
        const validateCardNumber =
            /^((?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12})|(4[0-9]{12}(?:[0-9]{3})?)$/gm
        const validateFullname = /^[a-zA-Zа-яА-Я]{2,} [a-zA-Zа-яА-Я]{2,}$/gm
        const errorMessage = {
            email: 'only letters, numbers, symbols ._%+ and @',
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
        }

        newErrors[e.target.name] = errorMessage[e.target.name] || newErrors[e.target.name]

        switch (e.target.name) {
            case 'fullName':
                newErrors[e.target.name] = validateFullname.test(e.target.value)
                    ? ''
                    : newErrors[e.target.name]
                break
            case 'cardnumber':
                newErrors[e.target.name] = validateCardNumber.test(e.target.value)
                    ? ''
                    : newErrors[e.target.name]
                break
            case 'expiry':
                newErrors[e.target.name] = validateExpiry.test(e.target.value)
                    ? ''
                    : newErrors[e.target.name]
                break
            case 'cvv':
                newErrors[e.target.name] = validateCVV.test(e.target.value)
                    ? ''
                    : newErrors[e.target.name]
                break
            case 'email':
                newErrors[e.target.name] = validateEmail.test(e.target.value)
                    ? ''
                    : newErrors[e.target.name]
                break
            case 'firstName':
                newErrors[e.target.name] = validateName.test(e.target.value)
                    ? ''
                    : newErrors[e.target.name]
                break
            case 'lastName':
                newErrors[e.target.name] = validateName.test(e.target.value)
                    ? ''
                    : newErrors[e.target.name]
                break
            case 'country':
                newErrors[e.target.name] = validateCityCountry.test(e.target.value)
                    ? ''
                    : newErrors[e.target.name]
                break
            case 'town':
                newErrors[e.target.name] = validateCityCountry.test(e.target.value)
                    ? ''
                    : newErrors[e.target.name]
                break
            case 'phoneNumber':
                newErrors[e.target.name] = validatePhone.test(e.target.value)
                    ? ''
                    : newErrors[e.target.name]
                break
            case 'username':
                newErrors[e.target.name] = validateUsername.test(e.target.value)
                    ? ''
                    : newErrors[e.target.name]
                break
            case 'password':
                newErrors[e.target.name] = validatePassword.test(e.target.value)
                    ? ''
                    : newErrors[e.target.name]
                break
            case 'confirmPassword':
                const target =
                    e.target.parentElement.previousElementSibling.previousElementSibling.querySelector(
                        "input[name='password']"
                    )
                newErrors[e.target.name] =
                    e.target.value === target.value ? '' : newErrors[e.target.name]
                break
            default:
                break
        }

        const hasError = newErrors[e.target.name] !== ''
        setErrors(newErrors)

        return hasError
    }

    const clearErrorHandler = (e) => {
        setErrors((error) => ({ ...error, [e.target.name]: '' }))
    }

    return {
        error,
        errorHandler,
        clearErrorHandler,
    }
}
