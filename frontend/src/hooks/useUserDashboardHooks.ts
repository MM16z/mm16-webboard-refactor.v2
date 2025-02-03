import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { dashBoardApiService } from '@/api/userDashboardService';
import { showAlert } from '@/utils/alert';
import { DASHBOARD_CONSTANTS } from '@/constants/dashboard';
import { toast } from 'sonner';

export const usePostOperations = (userId: number | null) => {
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({
        queryKey: ['userPosts', userId],
        queryFn: async () => {
            if (!userId) return;
            const response = await dashBoardApiService.getAllUserPosts({
                currentUserId: userId,
            });
            return response?.userPostData;
        },
        retry: (failureCount, error: any) => {
            if (error?.response?.status === 401) {
                window.location.href = '/login';
                return false;
            }
            return failureCount < 3;
        }
    });

    const createPostMutation = useMutation({
        mutationFn: async ({ title, content }: { title: string, content: string }) => {
            return dashBoardApiService.createPost({
                post_title: title,
                post_content: content,
            });
        },
        onSuccess: async (response) => {
            if (response?.status === 201) {
                await showAlert('success', {
                    title: DASHBOARD_CONSTANTS.ALERTS.SUCCESS.POST.TITLE,
                    text: DASHBOARD_CONSTANTS.ALERTS.SUCCESS.POST.TEXT
                });
                toast.success("Post created successfully");
                queryClient.invalidateQueries({ queryKey: ['userPosts', userId] });
            }
        },
        onError: async (error) => {
            await showAlert('error', {
                title: DASHBOARD_CONSTANTS.ALERTS.ERROR.TITLE,
                text: `${DASHBOARD_CONSTANTS.ALERTS.ERROR.POST} - ${error}`
            });
        }
    });

    const editPostMutation = useMutation({
        mutationFn: async ({ id, content }: { id: number, content: string }) => {
            return dashBoardApiService.editPost({
                id,
                post_content: content,
            });
        },
        onSuccess: async (response) => {
            if (response?.status === 200) {
                await showAlert('success', {
                    title: DASHBOARD_CONSTANTS.ALERTS.SUCCESS.EDIT.TITLE,
                    text: DASHBOARD_CONSTANTS.ALERTS.SUCCESS.EDIT.TEXT
                });
                toast.success("Post edited successfully");
                queryClient.invalidateQueries({ queryKey: ['userPosts', userId] });
            }
        },
        onError: async (error) => {
            await showAlert('error', {
                title: DASHBOARD_CONSTANTS.ALERTS.ERROR.TITLE,
                text: `${DASHBOARD_CONSTANTS.ALERTS.ERROR.EDIT} - ${error}`
            });
        }
    });

    const deletePostMutation = useMutation({
        mutationFn: async (postId: number) => {
            return dashBoardApiService.deletePost({ postId });
        },
        onSuccess: async (response) => {
            if (response?.status === 200) {
                await showAlert('success', {
                    title: DASHBOARD_CONSTANTS.ALERTS.SUCCESS.DELETE.TITLE,
                    text: DASHBOARD_CONSTANTS.ALERTS.SUCCESS.DELETE.TEXT
                });
                toast.success("Post deleted successfully");
                queryClient.invalidateQueries({ queryKey: ['userPosts', userId] });
            }
        },
        onError: async (error) => {
            await showAlert('error', {
                title: DASHBOARD_CONSTANTS.ALERTS.ERROR.TITLE,
                text: `${DASHBOARD_CONSTANTS.ALERTS.ERROR.DELETE} - ${error}`
            });
        }
    });

    return {
        data,
        isLoading,
        createPost: (title: string, content: string) =>
            createPostMutation.mutateAsync({ title, content }),
        editPost: (id: number, content: string) =>
            editPostMutation.mutateAsync({ id, content }),
        deletePost: (postId: number) =>
            deletePostMutation.mutateAsync(postId),
        isCreating: createPostMutation.isPending,
        isEditing: editPostMutation.isPending,
        isDeleting: deletePostMutation.isPending,
    };
}; 