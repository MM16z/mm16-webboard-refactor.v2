"use client"
// import React from 'react'

import { silkscreen } from '@/fonts/fonts'
import { usePathname } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { useRef } from 'react'
import { logOut } from '@/redux/slices/authSlice/authSlice'
import { authApiService } from '@/api/auth/auth'
import Swal from 'sweetalert2'
import MobileMenu from './MobileMenu'
import HamButton from './HamButton'
import { clearAuthCookies } from '@/utils/cookies'
import Link from 'next/link'

export default function Navbar() {
    const getUserData = useAppSelector((state) => state.userSlice.currentUser)
    const hamButtonRef = useRef<SVGSVGElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname()

    const dispatch = useAppDispatch()

    const onLogout = async () => {
        try {
            const response = await authApiService.Logout()
            if (response.status === 200) {
                dispatch(logOut())
                clearAuthCookies()
                Swal.fire({
                    title: 'Success',
                    text: 'Logout success',
                    icon: 'success'
                })
                window.location.href = '/'
            }
        } catch (error) {
            console.log(error)
            dispatch(logOut())
            clearAuthCookies()
            // Swal.fire({
            //     title: 'Error',
            //     text: `Failed to logout ${error}`,
            //     icon: 'error'
            // })
        }
    }

    const onHamButtonClick = () => {
        hamButtonRef.current?.classList.toggle("active");
        mobileMenuRef.current?.classList.toggle("active");
    }

    return (
        <nav
            className={`nav-container ${silkscreen.className} h-[66px] flex flex-row justify-between items-center z-50`}>
            <MobileMenu hamButtonRef={hamButtonRef} mobileMenuRef={mobileMenuRef} />
            <HamButton onHamButtonClick={onHamButtonClick} hamButtonRef={hamButtonRef} />
            {/* nav-item1 */}
            <Link href="/" scroll={false} className='ml-10 z-10 cursor-pointer text-center'>
                <div className='nav-logo text-[40px] tracking-[-5px] mt-[-10px]'>MM16STUDIO</div>
                <div className='nav-logo-sub text-[20px] tracking-[-1px] text-white mt-[-15px]'>Webboard X E-Commerce</div>
            </Link>
            {/* nav-item2 */}
            <div>
                <div className='current-user text-[20px] tracking-[-4px] text-center hidden sm:block'>
                    /Home, Howdy! :D @User : {getUserData.username ? getUserData.username : "Anonymous"}
                </div>
            </div>
            {/* nav-item3 */}
            <div className='mr-10 text-[20px] flex-row gap-x-2 cursor-pointer text-white hidden sm:flex'>
                {getUserData.userId && pathname !== '/user-dashboard' && (
                    <Link href="/user-dashboard" scroll={false} className='text-purple-600'>
                        Dashboard
                    </Link>
                )}
                {getUserData.userId && pathname === '/user-dashboard' && (
                    <Link href="/" scroll={false} className='text-purple-600'>
                        HOMEPAGE
                    </Link>
                )}
                {getUserData.userId && <div>|</div>}
                {!getUserData.userId && (
                    <>
                        <Link href="/register" scroll={false} className='text-purple-600'>
                            Register
                        </Link>
                        <div>|</div>
                        <Link href="/login" scroll={false} className='text-purple-600'>
                            Login
                        </Link>
                    </>
                )}
                {getUserData.userId && (
                    <div className='text-red-600' onClick={onLogout}>
                        Logout
                    </div>
                )}
            </div>
        </nav>
    )
}
