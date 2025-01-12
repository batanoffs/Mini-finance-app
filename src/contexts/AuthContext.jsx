import { useContext, createContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { cardService } from '../services/cardGenerationService'
import { useSessionStorage } from '../hooks/useSessionStorage'
import { dataService } from '../services/userDataService'
import { authService } from '../services/authService'
import { DEFAULT_VALUES } from '../constants'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useSessionStorage(`auth`, DEFAULT_VALUES)
    const navigate = useNavigate()

    const onLoginSubmitHandler = async (formData) => {
        const data = {
            login: formData.email,
            password: formData.password,
        }

        if (!data.login || !data.password) throw new Error('Null or empty value in formData')

        try {
            const response = await authService.login(data)

            if (response && response.message) return response

            const token = response['user-token']

            if(!token) throw new Error('No token found in response')

            sessionStorage.setItem('token', token)

            const ownerId = response['ownerId']

            if (!ownerId) throw new Error('No ownerId found in response')

            const userDataResponse = await dataService.getUserData(ownerId)

            if (userDataResponse === null || userDataResponse.length === 0)
                throw new Error('No user found with those credentials')

            const card = userDataResponse[0].virtualCard[0]

            if (card === null) throw new Error('card not found')

            const userData = userDataResponse[0]
            userData.virtualCard = card
            userData.email = response.email

            console.log('userData', userData)

            setAuth(userData)
            navigate('/dashboard/overview')
        } catch (error) {
            console.log(error || error.message)
        }
    }

    const onRegisterSubmitHandler = async (formData) => {
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
            return { message: 'Null or empty value in formData' }
        }

        if (formData.password !== formData.confirmPassword) return { message: 'Passwords do not match' }

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

            await cardService.setVirtualCardRelation(setUserDataResponse.objectId, [getCardResponse.objectId])

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
        onRegisterSubmitHandler,
        onLoginSubmitHandler,
        onLogoutHandler,
        isAuthenticated: () => sessionStorage.getItem('token'),
        token: sessionStorage.getItem('token') || 'No information',
        setAuth,
        auth,
    }

    return <AuthContext.Provider value={{ ...authDataContext }}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    return context
}
