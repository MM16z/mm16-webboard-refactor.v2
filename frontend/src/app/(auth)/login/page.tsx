'use client'

// react, nextjs
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
// components
import AuthForm from '@/components/form/AuthForm'
// actions
// fonts
import { silkscreen } from '@/fonts/fonts'
// utils
import swal from "sweetalert2";
import { useAppDispatch } from '@/redux/hook'
import { updateUser } from '@/redux/slices/userSlice/userSlice'
import { AxiosResponse } from 'axios'
import { authApiService } from '@/api/auth/auth'
import Cookies from 'js-cookie'
import { updateAuth } from '@/redux/slices/authSlice/authSlice'
import getUserInfo from '@/api/auth/getUserInfo'


function LoginPage() {
    const router = useRouter()

    const dispatch = useAppDispatch()

    const onSubmitHandler = async (value: any) => {
        try {
            const response: AxiosResponse = await authApiService.Login(value)
            if (response.status === 200) {
                const token = response.data.accessToken
                Cookies.set('jwtToken', token, { secure: true })
                Cookies.set('u_auth_status', 'active')
                dispatch(updateAuth({ token: token }))
                const user = await getUserInfo()
                if (user) {
                    dispatch(updateUser({
                        email: user.email,
                        username: user.username,
                        userId: user.id
                    }))
                }
                Cookies.set('u_id', user.id, { secure: true })
                router.push('/user-dashboard')
                swal.fire({
                    icon: 'success',
                    title: 'xdding?',
                    html: `Login success!`,
                })
            }
        } catch (error: any) {
            if (error.response) {
                console.log(error)
                Cookies.set('jwtToken', '', { secure: true })
                Cookies.set('u_auth_status', '')
                Cookies.set('u_id', '', { secure: true })
                return swal.fire({
                    icon: 'error',
                    title: 'xdding?',
                    text: `Login failed! - Error ${error.response.data.message}`,
                })
            }
        }
    }

    useEffect(() => {
        const token = Cookies.get('u_auth_status')
        if (token === 'active') {
            router.push('/user-dashboard')
        }
    }, [router])

    return (
        <div className={`login-page-container ${silkscreen.className} flex flex-col w-full h-full justify-center justify-items-center p-8 gap-y-4`}>
            <AuthForm pageType='login' onFormSubmit={onSubmitHandler} />
        </div>
    )
}

export default LoginPage