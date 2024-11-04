import Cookies from 'js-cookie'

export interface CookieOptions {
    secure?: boolean
    expires?: number
    path?: string
    domain?: string
    sameSite?: 'strict' | 'lax' | 'none'
}

export const COOKIE_KEYS = {
    JWT_TOKEN: 'jwtToken',
    AUTH_STATUS: 'u_auth_status',
    USER_ID: 'u_id',
} as const

export const setCookie = (
    key: string,
    value: string,
    options: CookieOptions = { secure: true }
) => {
    Cookies.set(key, value, options)
}

export const getCookie = (key: string) => {
    return Cookies.get(key)
}

export const removeCookie = (key: string) => {
    Cookies.remove(key)
}

export const setAuthCookies = (token: string, userId: string) => {
    setCookie(COOKIE_KEYS.AUTH_STATUS, 'active')
    setCookie(COOKIE_KEYS.USER_ID, userId)
}

export const clearAuthCookies = () => {
    Cookies.remove(COOKIE_KEYS.JWT_TOKEN)
    Cookies.remove(COOKIE_KEYS.AUTH_STATUS)
    Cookies.remove(COOKIE_KEYS.USER_ID)
} 