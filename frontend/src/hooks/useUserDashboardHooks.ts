import { useState, useCallback } from 'react';
import { dashBoardApiService } from '@/api/userDashboardService';
import { showAlert } from '@/utils/alert';
import { DASHBOARD_CONSTANTS } from '@/constants/dashboard';
import { Post } from '@/types/shared/postTypes';
import { toast } from 'sonner';

export const usePostOperations = (userId: number | null) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    const fetchPosts = useCallback(async () => {
        if (!userId) return;
        try {
            setIsLoading(true);
            const response = await dashBoardApiService.getAllUserPosts({
                currentUserId: userId,
            });

            if (response?.userPostData) {
                setPosts(response.userPostData);
            }
        } catch (error) {
            if (error instanceof Error) {
                const response = error as { response?: { status?: number } };
                if (response.response?.status === 401) {
                    window.location.href = '/login';
                    return;
                }
            }
            await showAlert('error', {
                title: DASHBOARD_CONSTANTS.ALERTS.ERROR.TITLE,
                text: `Failed to fetch posts - ${error}`
            });
        } finally {
            setIsLoading(false);
        }
    }, [userId]);

    const createPost = async (title: string, content: string) => {
        try {
            const response = await dashBoardApiService.createPost({
                post_title: title,
                post_content: content,
            });

            if (response?.status === 201) {
                await showAlert('success', {
                    title: DASHBOARD_CONSTANTS.ALERTS.SUCCESS.POST.TITLE,
                    text: DASHBOARD_CONSTANTS.ALERTS.SUCCESS.POST.TEXT
                });
                await fetchPosts();
                toast.success("Post created successfully")
                return true;
            }
            return false;
        } catch (error) {
            await showAlert('error', {
                title: DASHBOARD_CONSTANTS.ALERTS.ERROR.TITLE,
                text: `${DASHBOARD_CONSTANTS.ALERTS.ERROR.POST} - ${error}`
            });
            return false;
        }
    };

    const editPost = async (id: number, content: string) => {
        try {
            const response = await dashBoardApiService.editPost({
                id,
                post_content: content,
            });

            if (response?.status === 200) {
                await showAlert('success', {
                    title: DASHBOARD_CONSTANTS.ALERTS.SUCCESS.EDIT.TITLE,
                    text: DASHBOARD_CONSTANTS.ALERTS.SUCCESS.EDIT.TEXT
                });
                toast.success("Post edited successfully")
                await fetchPosts();
                return true;
            }
            return false;
        } catch (error) {
            await showAlert('error', {
                title: DASHBOARD_CONSTANTS.ALERTS.ERROR.TITLE,
                text: `${DASHBOARD_CONSTANTS.ALERTS.ERROR.EDIT} - ${error}`
            });
            return false;
        }
    };

    const deletePost = async (postId: number) => {
        try {
            const response = await dashBoardApiService.deletePost({
                postId,
            });

            if (response?.status === 200) {
                await showAlert('success', {
                    title: DASHBOARD_CONSTANTS.ALERTS.SUCCESS.DELETE.TITLE,
                    text: DASHBOARD_CONSTANTS.ALERTS.SUCCESS.DELETE.TEXT
                });
                await fetchPosts();
                toast.success("Post deleted successfully")
                return true;
            }
            return false;
        } catch (error) {
            await showAlert('error', {
                title: DASHBOARD_CONSTANTS.ALERTS.ERROR.TITLE,
                text: `${DASHBOARD_CONSTANTS.ALERTS.ERROR.DELETE} - ${error}`
            });
            return false;
        }
    };

    return {
        posts,
        isLoading,
        fetchPosts,
        createPost,
        editPost,
        deletePost,
        isEditing,
        setIsEditing
    };
}; 