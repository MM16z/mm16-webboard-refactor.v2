import { Post } from './postTypes'

export interface HomePagePost extends Post {
    post_liked_count: number
    isLiked: boolean
    comments: PostComment[]
}

export interface PostComment {
    id: number
    comment_content: string
    user: {
        id: number
        username: string
    }
}

export interface HomePageData {
    allPosts: HomePagePost[]
    postsCount: number
}

export interface HomePageProps {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
} 