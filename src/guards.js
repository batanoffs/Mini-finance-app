import { redirect } from 'react-router-dom'

import { clearUserData, getUserData } from './utils/sessionStorage'

// restrict the login page if the user is already logged in
export const restrictLoginPage = () => {
    const { data, token } = getUserData()

    // if there is missing data in the local storage, clear the data
    if (!data || !token) {
        clearUserData()
    }
    // if the user is logged in, redirect to the home page
    else {
        return redirect('/dashboard')
    }

    return null
}

export const restrictDashboard = ({ request }) => {
    const { data, token } = getUserData()

    // if there is missing data in the local storage, redirect to the home page
    if (!data) {
        return redirect('/')
    }

    // if there is missing token or is_admin data, clear the data and redirect to the login page
    if (!token) {
        clearUserData()
        return redirect('/login')
    }

    // if the user is not an admin and tries to access the register page, redirect to the keywords page
    if (request.url.includes('/register')) {
        return redirect('/dashboard/overview')
    }

    return data
}
