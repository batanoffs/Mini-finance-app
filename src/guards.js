import { redirect } from 'react-router-dom';

import { clearUserData, getUserData, getUserToken } from './utils/sessionStorage';
// import { authService } from './services';

// restrict the login page if the user is already logged in
export const restrictLoginPage = () => {
    const { data } = getUserData();
    const { token } = getUserToken();

    // if there is missing data in the local storage, clear the data
    if (!data || !token) {
        clearUserData();
    }
    // if the user is logged in, redirect to the home page
    else {
        return redirect('/dashboard');
    }

    return null;
};

export const restrictDashboard = ({ request }) => {
    const { data } = getUserData();
    const { token } = getUserToken();

    // if there is missing data in the local storage, redirect to the home page
    if (!data) {
        return redirect('/');
    }

    // if there is missing token or is_admin data, clear the data and redirect to the login page
    if (!token) {
        clearUserData();
        return redirect('/login');
    }

    // if the user is not an admin and tries to access the register page, redirect to the keywords page
    if (request.url.includes('/register')) {
        return redirect('/dashboard/overview');
    }

    return data;
};

// // restrict access to public pages (login, register, etc) if user is logged in
// export const restrictLoginPage = () => {
//     const { data } = getUserData();
//     const { token } = getUserToken();

//     // If we have local session data, immediately prevent access to public routes
//     if (data && token) {
//         // Check session validity on the backend
//         authService
//             .validateSession()
//             .then((session) => {
//                 console.log('User Session: ', { data });

//                 if (!session) {
//                     clearUserData(); // Clear only if backend says session is invalid
//                     return redirect('/login');
//                 }

//                 // Immediately redirect to prevent public route access
//                 return redirect('/dashboard');
//             })
//             .catch((error) => {
//                 console.log('Session validation error:', error);
//                 clearUserData();
//                 // Let the next navigation handle the redirect
//             });
//     }

//     return null; // Allow access to public routes if no local session
// };

// // restrict access to dashboard if user is not logged in
// export const restrictDashboard = async ({ request }) => {
//     // First check local session
//     const { data } = getUserData();
//     const { token } = getUserToken();

//     // No local data, redirect to login without clearing (already empty)
//     // if (!data || !token) {
//     //     return redirect('/login');
//     // }

//     try {
//         // Validate backend session
//         const session = await authService.validateSession();

//         if (!session) {
//             clearUserData(); // Clear only if backend says session is invalid
//             return redirect('/login');
//         }

//         // User is authenticated, prevent access to public pages
//         const publicPages = ['/register', '/login', '/reset', '/about'];
//         if (publicPages.some((page) => request.url.includes(page))) {
//             return redirect('/dashboard/overview');
//         }

//         return data;
//     } catch (error) {
//         console.log('Error: ', error);
//         clearUserData(); // Clear on error since we can't validate
//         return redirect('/login');
//     }
// };
