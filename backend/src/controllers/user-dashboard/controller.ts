import { Response } from 'express';

import { AuthenticatedRequest } from '../../middlewares/authMiddleware.js';
import { userDashboardService } from '../../services/user-dashboard/service.js';

export const getUserPostsController = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.decoded?.id;
    try {
        if (userId === undefined) {
            throw new Error('User ID is undefined');
        }
        const userPosts = await userDashboardService.getUserPosts(userId);
        res.status(200).json({
            userPostData: userPosts,
        });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const createPostController = async (req: AuthenticatedRequest, res: Response) => {
    const user = req.decoded;
    const { post_title, post_content } = req.body;
    const postPayload = {
        user_id: user?.id,
        post_username: user?.username,
        post_title: post_title,
        post_content: post_content,
    };
    try {
        const newPost = await userDashboardService.createPost(postPayload);
        res.status(201).json({
            newPost,
        });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const updatePostController = async (req: AuthenticatedRequest, res: Response) => {
    const post = req.body;
    try {
        const updatedPost = await userDashboardService.updatePost(post);
        res.status(200).json({
            updatedPost,
        });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const deletePostController = async (req: AuthenticatedRequest, res: Response) => {
    const postId = Number(req.body.postId);
    try {
        const deletedPost = await userDashboardService.deletePost(postId);
        res.status(200).json({
            deletedPost,
        });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
