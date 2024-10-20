import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const homePageService = {
    getAllHomePageData,
    updatePostLike,
    createComment,
    deleteComment,
};

async function getAllHomePageData(userId: number | null, offset: number) {
    const allPosts = await prisma.posts.findMany({
        select: {
            id: true,
            post_username: true,
            post_title: true,
            post_content: true,
            created_at: true,
            comments: {
                select: {
                    id: true,
                    user_id: true,
                    user: true,
                    comment_content: true,
                    created_at: true,
                },
            },
            post_liked: {
                select: {
                    user_id: true,
                },
            },
            _count: {
                select: {
                    post_liked: true,
                },
            },
        },
        orderBy: {
            id: 'asc',
        },
        take: 6,
        skip: offset,
    });

    const combinedPosts = allPosts.map((post) => ({
        ...post,
        isLiked: post.post_liked.some((like) => like.user_id === userId),
        post_liked_count: post._count.post_liked,
    }));

    const postCount = await prisma.posts.count();

    return {
        allPosts: combinedPosts,
        postsCount: postCount,
    };
}

async function updatePostLike(postId: number, userId: number, actionType: 'like' | 'unlike') {
    if (actionType === 'like') {
        const response = await prisma.post_liked.create({
            data: {
                post_id: postId,
                user_id: userId,
            },
        });
        return response;
    } else {
        const response = await prisma.post_liked.delete({
            where: {
                user_id_post_id: {
                    user_id: userId,
                    post_id: postId,
                },
            },
        });
        return response;
    }
}

async function createComment(postId: number, userId: number, commentContent: string) {
    const response = await prisma.comments.create({
        data: {
            comment_content: commentContent,
            posts: {
                connect: {
                    id: postId,
                },
            },
            user: {
                connect: {
                    id: userId,
                },
            },
        },
    });
    return response;
}

async function deleteComment(commentId: number) {
    const response = await prisma.comments.delete({
        where: {
            id: commentId,
        },
    });
    return response;
}
