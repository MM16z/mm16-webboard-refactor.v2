import { HomePagePost, PostComment } from "@/types/shared/homePageTypes"
import PostBoxContainer from "@/components/post-box/PostBox"
import HeartBtn from "@/components/heart-btn/HeartBtn"
import CommentForm from "./commentForm"
import CommentBoxContainer from "@/components/post-box/CommentBox"
import dayjs from "dayjs"
import MasonryComponent from "@/components/masonry/Masonry"

interface PostListProps {
    posts: HomePagePost[]
}

export const PostList = ({ posts }: PostListProps) => {
    const emptyPosts = Array(Math.max(0, 6 - posts.length)).fill({})
    const allPosts = [...posts, ...emptyPosts]

    return (
        <div className="masonry-warper mt-4">
            <MasonryComponent>
                {allPosts.map((post: any, index: number) => {
                    if (Object.keys(post).length === 0) {
                        return <div key={`empty-${index}`} style={{ width: '400px', height: '0px' }}></div>
                    }
                    return <PostItem key={post.id} post={post} />
                })}
            </MasonryComponent>
        </div>
    )
}

const PostItem = ({ post }: { post: HomePagePost }) => {
    return (
        <PostBoxContainer
            username={post.post_username}
            title={post.post_title}
            postcontent={post.post_content}
            postdate={dayjs(post.created_at).format("D MMM YYYY - HH:mm")}
            userImage={post.user.profile_image}
        >
            <HeartBtn
                postLikedCount={post.post_liked_count}
                defaultChecked={post.isLiked}
                postId={post.id}
            />
            <CommentList comments={post.comments} />
            <CommentForm postId={post.id} />
        </PostBoxContainer>
    )
}

const CommentList = ({ comments }: { comments: PostComment[] }) => {
    return (
        <>
            {comments.length > 0 ? comments.map((comment) => {
                return (
                    <CommentBoxContainer
                        key={comment.id}
                        commentusername={comment.user.username}
                        commentcontent={comment.comment_content}
                        commentId={comment.id}
                        commentUserId={comment.user.id}
                        userImage={comment.user.profile_image}
                    />
                )
            }) : <div className="relative left-5 top-2.5 font-silkscreen text-sm opacity-80 mb-4">No comment</div>}
        </>
    )
} 