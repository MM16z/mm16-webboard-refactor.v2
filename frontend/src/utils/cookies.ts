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
    options: CookieOptions = {}
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
}

export const clearAuthCookies = () => {
    removeCookie(COOKIE_KEYS.JWT_TOKEN)
    removeCookie(COOKIE_KEYS.AUTH_STATUS)
    removeCookie(COOKIE_KEYS.USER_ID)
} 