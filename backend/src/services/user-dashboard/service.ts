import { PrismaClient } from '@prisma/client';

import { PostModel } from '../../models/user-dashboard/model.js';

const prisma = new PrismaClient();

export const userDashboardService = {
    getUserPosts,
    createPost,
    updatePost,
    deletePost,
};

async function getUserPosts(userId: number | null) {
    const userPosts = await prisma.posts.findMany({
        where: {
            user_id: userId === 2 ? undefined : userId !== null ? userId : undefined,
        },
    });
    return userPosts;
}

async function createPost(post: PostModel) {
    const newPost = await prisma.posts.create({
        data: {
            post_username: post.post_username ?? '',
            post_title: post.post_title,
            post_content: post.post_content,
            user: {
                connect: {
                    id: post.user_id,
                },
            },
        },
    });
    return newPost;
}

async function updatePost(post: PostModel) {
    const updatedPost = await prisma.posts.update({
        where: { id: post.id },
        data: {
            post_content: post.post_content,
        },
    });
    return updatedPost;
}

async function deletePost(postId: number) {
    const deletedPost = await prisma.posts.delete({
        where: { id: postId },
    });
    return deletedPost;
}
