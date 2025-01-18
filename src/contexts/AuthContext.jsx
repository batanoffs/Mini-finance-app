import { useContext, createContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { useSessionStorage } from '../hooks/useSessionStorage'
import { authService } from '../services/authService'
import { clearUserData } from '../utils/sessionStorage'
import { DEFAULT_VALUES } from '../constants'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useSessionStorage(`auth`, DEFAULT_VALUES)
    const navigate = useNavigate()

    const onLogoutHandler = async () => {
        try {
            const token = sessionStorage.getItem('token')
            await authService.logout(token)

            clearUserData()
            setAuth({})
            navigate('/')
            
        } catch (error) {
            console.log(error)
        }
    }

    const authDataContext = {
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
