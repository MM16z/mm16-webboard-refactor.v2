"use client"

import { homepageApiService } from "@/api/homepageService";
import { verela } from "@/fonts/fonts";
import { useAppSelector } from "@/redux/hook";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { ProfileImageUpload } from "../profile/ProfileImageUpload";

type CommentBoxContainer = {
    commentusername: string;
    commentcontent: string;
    commentId: number;
    commentUserId: number;
    userImage: string;
};

const CommentBoxContainer = (probs: CommentBoxContainer) => {
    const { commentusername, commentcontent, commentId, commentUserId, userImage } = probs;
    const router = useRouter()
    const userId = useAppSelector(state => state.userSlice.currentUser.userId)

    const isHasPermission = userId === commentUserId
    const handleDeleteComment = async () => {
        try {
            const response = await homepageApiService.deleteComment(commentId)
            if (response.status === 200) {
                Swal.fire({
                    title: "Success",
                    text: "Comment deleted successfully",
                    icon: "success"
                })
                router.refresh()
                toast.success("Comment deleted successfully")
            }
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: "Error",
                text: `Failed to delete comment: ${error}`,
                icon: "error"
            })
        }
    }
    return (
        <div className="reply-box-container pt-4">
            <hr className="mt-[-10px]"></hr>
            <div className="flex flex-row items-center gap-2 pt-4 pb-2">
                <ProfileImageUpload currentImageUrl={userImage ?? ''} showUploadSection={false} customSize="w-8 h-8" />
                <span className="">{commentusername}</span>
            </div>
            <span className={`${verela.className} pt-2`}>{commentcontent}</span>
            <button className="post-action-btn delete-btn" style={{
                display: isHasPermission ? "block" : "none",
                cursor: "pointer",
            }}
                onClick={() => {
                    Swal.fire({
                        title: 'Are you sure?',
                        text: 'You will not be able to recover this post!',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Yes, delete it!',
                        cancelButtonText: 'No, cancel it!',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            handleDeleteComment()
                        }
                    })
                }}
            >Delete comment</button>
        </div>
    );
};

export default CommentBoxContainer;
