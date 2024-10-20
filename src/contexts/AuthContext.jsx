import { useState, useContext, createContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { cardService } from '../services/cardGenerationService'
import { useSessionStorage } from '../hooks/useSessionStorage'
import { dataService } from '../services/userDataService'
import { authService } from '../services/authService'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useSessionStorage(`auth`, {})
    const [loginError, setLoginError] = useState(false)
    const navigate = useNavigate()
    let loginResponse

    const onLoginSubmitHandler = async (formData) => {
        const data = {
            login: formData.email,
            password: formData.password,
        }

        if (!data.login || !data.password) {
            return
        }
        try {
            loginResponse = await authService.login(data)
            console.log('response from login', loginResponse)

            if (loginResponse.message) {
                console.error(loginResponse.message)
                return
            }

            const token = loginResponse['user-token']
            const ownerId = loginResponse['ownerId']
            // Store the token in session storage
            sessionStorage.setItem('token', token)

            const userDataResponse = await dataService.getUserData(ownerId)

            if (userDataResponse === null) {
                throw new Error('userDataResponse is null')
            }

            if (userDataResponse.length === 0) {
                throw new Error('userDataResponse has no elements')
            }

            const card = userDataResponse[0].virtualCard[0]

            if (card === null) {
                throw new Error('card is null')
            }

            const userData = userDataResponse[0]

            userData.virtualCard = card
            userData.email = loginResponse.email

            setAuth(userData)
            navigate('/dashboard/overview')
            return true
        } catch (error) {
            console.error(error)
            setLoginError(true)
        }
    }

    const onRegisterSubmitHandler = async (formData) => {
        console.log(formData)
        if (
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword ||
            !formData.firstName ||
            !formData.lastName ||
            !formData.gender ||
            !formData.country ||
            !formData.phoneNumber ||
            !formData.address ||
            !formData.town ||
            !formData.cardId
        ) {
            console.error('Null or empty value in formData')
            return false
        }
        if (formData.password !== formData.confirmPassword) {
            console.error('Passwords do not match')
            return false
        }
        const registerData = {
            email: formData.email,
            password: formData.password,
        }
        try {
            const registerResponse = await authService.register(registerData)
            const setUserDataResponse = await dataService.setUserData({
                address: formData.address,
                cardId: formData.cardId,
                country: formData.country,
                gender: formData.gender,
                fullName: formData.firstName + ' ' + formData.lastName,
                phoneNumber: formData.phoneNumber,
                town: formData.town,
                ownerId: registerResponse['ownerId'],
            })
            const getCardResponse = await cardService.generateCard(formData.cardId)

            await cardService.setVirtualCardRelation(setUserDataResponse.objectId, [
                getCardResponse.objectId,
            ])

            navigate('/login')
        } catch (error) {
            console.log(error)
            window.alert('Unsuccessful registration')
        }
    }

    const onLogoutHandler = async () => {
        const token = sessionStorage.getItem('token')
        await authService.logout(token)
        sessionStorage.removeItem('token')
        setAuth({})
        sessionStorage.removeItem('auth')
    }

    const authDataContext = {
        onLoginSubmitHandler,
        onRegisterSubmitHandler,
        onLogoutHandler,
        ownerId: auth.ownerId || 'No information',
        token: sessionStorage.getItem('token') || 'No information',
        email: auth.email || 'No information',
        userStatus: auth.userStatus,
        isAuthenticated: () => sessionStorage.getItem('token'),
        name: auth.fullName || 'user',
        phone: auth.phoneNumber || 'phone number',
        country: auth.country || 'country',
        virtualCard: auth.virtualCard || {
            number: `0000 0000 0000 0000`,
            expiration: '00/00',
            cvv: `000`,
            balance: Number(`00000000`),
            issuer: 0,
            brand: `No information`,
            objectId: `No information`,
            created: `information`,
        },
        picture:
            auth.avatar || 'https://notablepen.backendless.app/api/files/app/UserData/default.png',
        transactions: auth.transactions || [],
        friends: auth.friends || [],
        favorites: auth.favorite_friends || [],
        address: auth.address || 'No information',
        userDataId: auth.objectId || 'No information',
        setAuth: setAuth,
        auth: auth,
    }

    return (
        <>
            <AuthContext.Provider value={{ ...authDataContext, loginError, setLoginError }}>
                {children}
            </AuthContext.Provider>
        </>
    )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    return context
}
