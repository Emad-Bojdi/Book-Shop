const setCookie = (tokens) => {
    document.cookie = `accessToken=${tokens?.accessToken}; max-age=${1 * 24 * 60 * 60}`;
    // document.cookie = `refreshToken=${tokens?.refreshToken}; max-age=${30 * 24 * 60 * 60}`;
}

const getCookie = (cookieName) => {
    return document.cookie.split(";").find((token) => token.trim().split("=")[0] === cookieName)?.split("=")[1];
}

const deleteCookies = () => {
    document.cookie = "accessToken=null; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    return "success"
}

export { setCookie, getCookie , deleteCookies };

/**
 * Cookie Management Utility Module
 * Provides functions for setting, getting, and removing cookies with security options
 */

/**
//  * Sets a cookie with the specified name, value, and options
//  * @param {string} name - The name of the cookie
//  * @param {string} value - The value to store in the cookie
//  * @param {Object} options - Cookie options (maxAge, path, secure, sameSite)
//  */
// const setCookie = (name, value, options = {}) => {
//     const {
//         maxAge = 24 * 60 * 60, // 1 day default
//         path = '/',
//         secure = true,
//         sameSite = 'Strict'
//     } = options;

//     let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
//     cookie += `; max-age=${maxAge}`;
//     cookie += `; path=${path}`;
    
//     if (secure) cookie += '; Secure';
//     cookie += `; SameSite=${sameSite}`;

//     document.cookie = cookie;
// };

// /**
//  * Gets a cookie value by name
//  * @param {string} name - The name of the cookie to retrieve
//  * @returns {string|null} The cookie value or null if not found
//  */
// const getCookie = (name) => {
//     const cookies = document.cookie.split(';');
//     const cookieName = encodeURIComponent(name);

//     for (let cookie of cookies) {
//         cookie = cookie.trim();
//         if (cookie.indexOf(cookieName + '=') === 0) {
//             return decodeURIComponent(cookie.substring(cookieName.length + 1));
//         }
//     }
//     return null;
// };

// /**
//  * Removes a cookie by setting its expiration to the past
//  * @param {string} name - The name of the cookie to remove
//  * @param {string} path - The path of the cookie (must match the path used when setting)
//  */
// const removeCookie = (name, path = '/') => {
//     document.cookie = `${encodeURIComponent(name)}=; max-age=0; path=${path}`;
// };

// /**
//  * Sets authentication tokens as cookies
//  * @param {Object} tokens - Object containing access and refresh tokens
//  */
// const setAuthCookies = (tokens) => {
//     if (tokens?.accessToken) {
//         setCookie('accessToken', tokens.accessToken, {
//             maxAge: 24 * 60 * 60, // 1 day
//             secure: true,
//             sameSite: 'Strict'
//         });
//     }

//     if (tokens?.refreshToken) {
//         setCookie('refreshToken', tokens.refreshToken, {
//             maxAge: 30 * 24 * 60 * 60, // 30 days
//             secure: true,
//             sameSite: 'Strict'
//         });
//     }
// };

// export { setCookie, getCookie, removeCookie, setAuthCookies };