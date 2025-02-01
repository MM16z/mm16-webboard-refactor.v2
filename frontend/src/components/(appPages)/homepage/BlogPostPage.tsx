'use client'

import { useAppSelector } from "@/redux/hook"
import { getHomePageData } from '@/hooks/useHomePageHooks'
import { useEffect, useState } from 'react'
import { HomePageData } from "@/types/shared/homePageTypes"
import { PostList } from "./PostList"
import ReactPaginateComponent from "@/components/paginate/ReactPaginate"
import { useSearchParams } from 'next/navigation'
import { silkscreen, verela } from "@/fonts/fonts"
import LoadingText from "@/components/ui/loadingText"

export function BlogPostsPage() {
    const userId = useAppSelector((state) => state.userSlice.currentUser.userId)
    const [data, setData] = useState<HomePageData | null>(null)
    const searchParams = useSearchParams()
    const page = Number(searchParams.get('page')) || 1

    useEffect(() => {
        const fetchData = async () => {
            const { allPosts, postsCount } = await getHomePageData(page, userId?.toString() || '')
            setData({ allPosts, postsCount })
        }
        fetchData()
    }, [userId, page])

    if (!data) return <LoadingText />

    return (
        <main className={`${silkscreen.className} overflow-x-hidden custom-scrollbar`}>
            <h2 className={`text-2xl mt-2  text-center`} style={{
                fontFamily: verela.style.fontFamily,
                fontWeight: 800
            }}>BlogPostsPage</h2>
            <h3 className={`${verela.className} text-center pt-4 pb-2 text-2xl opacity-70`}>
                Register with any non-existing email to post, comment, or like.
                <br />
                <span>
                    or try an global account? email/user=
                    <span className="font-bold">admin</span> password=
                    <span className="font-bold">1234</span>
                </span>
            </h3>
            <div className="text-center text-xl font-bold text-purple-700">Go to dashboard to make your own posts!</div>
            <PostList posts={data.allPosts} />
            <ReactPaginateComponent
                postCount={data.postsCount}
                currentPageProps={page - 1}
            />
        </main>
    )
} 