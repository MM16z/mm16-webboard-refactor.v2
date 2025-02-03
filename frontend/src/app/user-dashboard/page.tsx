'use client'
import "@/styles/(appPages)/user-dashboard/user-dashboard.css"
import "@/styles/post-box/post-box.css"
import 'react-loading-skeleton/dist/skeleton.css'

import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/hook';
import { silkscreen } from "@/fonts/fonts";
import { useRouter } from "next/navigation";
import EditInput from '@/components/(appPages)/user-dashboard/EditInput';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from "framer-motion"
import { FormError } from "@/components/ui/form-error"

import { DASHBOARD_CONSTANTS } from '@/constants/dashboard';
import { UserDashboardPostBox } from '@/components/(appPages)/user-dashboard/UserDashboardPostBox';
import { usePostOperations } from '@/hooks/useUserDashboardHooks';
import { PostFormData } from "@/types/userDashboard.types";
import LoadingSkeleton from '@/components/ui/loading-skeleton';
import { postSchema } from "@/schemas/userdashboard.schema";
import { ProfileImageUpload } from "@/components/profile/ProfileImageUpload";
import { Post } from '@/types/shared/postTypes';

const UserDashboardPage = () => {
    const router = useRouter();
    const getUserData = useAppSelector((state) => state.userSlice.currentUser);
    const userId = getUserData.userId;

    const [editingPostId, setEditingPostId] = useState<number | null>(null);

    const {
        data: posts,
        isLoading,
        createPost,
        editPost,
        deletePost,
        isCreating,
        isEditing,
        isDeleting
    } = usePostOperations(userId);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<PostFormData>({
        resolver: zodResolver(postSchema),
    });

    const onPostSubmitHandler = async (data: PostFormData) => {
        try {
            await createPost(data.title, data.content);
            reset();
            router.push('/', { scroll: false });
        } catch (error) {
            console.error('Failed to create post:', error);
        }
    };

    const onEditSubmitHandler = async (content: string) => {
        if (editingPostId === null) return;

        try {
            await editPost(editingPostId, content);
            setEditingPostId(null);
        } catch (error) {
            console.error('Failed to edit post:', error);
        }
    };

    useEffect(() => {
        if (!isLoading && !isCreating && !isEditing && !isDeleting) {
            window.scrollTo({

                top: 0,

                behavior: 'smooth'

            });
        }
    }, [isLoading, isCreating, isEditing, isDeleting]);

    if (!getUserData.userId || isLoading) {
        return <LoadingSkeleton />
    }

    if (isCreating || isEditing || isDeleting) {
        return <LoadingSkeleton />
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`${silkscreen.className} userpanel-container`}
        >
            {editingPostId !== null && (
                <EditInput
                    onClose={() => {
                        setEditingPostId(null);
                    }}
                    titleInputValue={posts.find((post: Post) => post.id === editingPostId)?.post_content}
                    onEditSubmit={onEditSubmitHandler}
                />
            )}
            <form onSubmit={handleSubmit(onPostSubmitHandler)} className="z-10 text-center">
                <span className={`${silkscreen.className} text-4xl z-10`}>
                    {DASHBOARD_CONSTANTS.MESSAGES.WELCOME} {getUserData?.username}
                </span>
                <div className="flex justify-center items-center mt-4 mb-4">
                    <ProfileImageUpload
                        currentImageUrl={getUserData?.profileImage ?? ''}
                    />
                </div>
                <div className="user-panel-inputcontainer">
                    <label htmlFor="post-text-input" style={{ marginBottom: "20px" }}>
                        {DASHBOARD_CONSTANTS.MESSAGES.WRITE_POST}
                    </label>
                    <textarea
                        placeholder={DASHBOARD_CONSTANTS.PLACEHOLDERS.TITLE}
                        autoFocus
                        {...register("title")}
                        className="post-inputborder"
                        id="post-text-input"
                        typeof="text"
                        style={{ height: "80px", overflow: "hidden" }}
                    />
                    <FormError message={errors.title?.message} />
                    <textarea
                        placeholder={DASHBOARD_CONSTANTS.PLACEHOLDERS.CONTENT}
                        {...register("content")}
                        className="post-inputborder"
                        id="post-text-input"
                        typeof="text"
                    />
                    <FormError message={errors.content?.message} />
                    <input id="post-submitbtn" type="submit" value="Post" />
                </div>
            </form>
            <section className="user-posts">
                <span id="user-post-text">{DASHBOARD_CONSTANTS.MESSAGES.RECENT_POSTS}</span>
                <div className="user-posts-container">
                    {posts?.map((post: Post) => (
                        <UserDashboardPostBox
                            key={post.id}
                            post={post}
                            onEdit={(id, content) => {
                                setEditingPostId(id);
                            }}
                            onDelete={deletePost}
                            currentUserId={userId}
                        />
                    ))}
                </div>
            </section>
            <div id="home-page-bg" className="z-0">
                <span id="home-page-bg-nested"></span>
            </div>
        </motion.div>
    );
}

export default UserDashboardPage;
