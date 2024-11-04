import { silkscreen, verela } from "../fonts/fonts"
import ReactPaginateComponent from "@/components/paginate/ReactPaginate"
import SystemInfo from "@/components/SystemInfo"
import { cookies } from "next/headers"
import { PostList } from "@/components/(pages)/homepage/PostList"
import { useHomePageData } from "@/hooks/useHomePageData"
import { HomePageProps } from "@/types/shared/homePageTypes"

export const fetchCache = 'force-no-store'

export default async function HomePage({ searchParams }: HomePageProps) {
  const userId = cookies().get('u_id')?.value
  const page = Number(searchParams?.page || 1)
  const { allPosts, postsCount } = await useHomePageData(page, userId)

  return (
    <main className={`${silkscreen.className} overflow-x-hidden`}>
      <SystemInfo />
      <div id="home-page-bg">
        <span id="home-page-bg-nested"></span>
      </div>

      <h3 className={`${verela.className} text-center pt-4 pb-2 text-2xl`}>
        Register with any non-existing email to post, comment, or like.
        <br />
        <span>
          or try an global account? email/user=
          <span className="font-bold">admin</span> password=
          <span className="font-bold">1234</span>
        </span>
      </h3>
      <div className="text-center text-xl font-bold text-purple-700">Go to dashboard to make your own posts!</div>
      <PostList posts={allPosts} />
      <ReactPaginateComponent
        postCount={postsCount}
        currentPageProps={page - 1}
      />
    </main>
  )
}
