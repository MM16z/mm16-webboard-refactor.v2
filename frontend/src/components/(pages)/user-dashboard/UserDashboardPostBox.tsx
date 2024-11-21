import { Post } from "@/types/shared/postTypes";
import { DASHBOARD_CONSTANTS } from "@/constants/dashboard";
import { showConfirmation } from "@/utils/alert";
import Image from "next/image";
import userIcon from "@/assets/bussiness-man.png";
import dayjs from "dayjs";
import { verela } from "@/fonts/fonts";
import { ProfileImageUpload } from "@/components/profile/ProfileImageUpload";

interface UserDashboardPostBoxProps {
    post: Post;
    onEdit: (id: number, content: string) => void;
    onDelete: (id: number) => void;
    currentUserId: number | null;
}

export const UserDashboardPostBox = ({
    post,
    onEdit,
    onDelete,
    currentUserId
}: UserDashboardPostBoxProps) => {
    const handleDelete = async () => {
        const result = await showConfirmation({
            title: DASHBOARD_CONSTANTS.MESSAGES.DELETE_CONFIRMATION.TITLE,
            text: DASHBOARD_CONSTANTS.MESSAGES.DELETE_CONFIRMATION.TEXT,
            confirmButtonText: DASHBOARD_CONSTANTS.MESSAGES.DELETE_CONFIRMATION.CONFIRM_BUTTON,
            cancelButtonText: DASHBOARD_CONSTANTS.MESSAGES.DELETE_CONFIRMATION.CANCEL_BUTTON
        });

        if (result.isConfirmed) {
            onDelete(post.id);
        }
    };

    const isOwner = currentUserId === post.user_id;

    return (
        <div className="post-box-container">
            <span className="vertical-line"></span>
            <span className="vertical-line_1"></span>
            <span className="horizontal-line"></span>
            <ProfileImageUpload currentImageUrl={post.user?.profile_image ?? ''} showUploadSection={false} />

            {isOwner && (
                <>
                    <button
                        className="post-action-btn edit-btn"
                        type="button"
                        onClick={() => onEdit(post.id, post.post_content)}
                    >
                        EDIT
                    </button>
                    <button
                        className="post-action-btn delete-btn"
                        type="button"
                        onClick={handleDelete}
                    >
                        DELETE
                    </button>
                </>
            )}

            <span className="username">{post.post_username}</span>
            <span className={`title ${verela.className}`}>{post.post_title}</span>
            <span className="line5"></span>
            <span className="line6"></span>
            <span className={`post-content ${verela.className}`} style={{ marginBottom: "25px" }}>
                {post.post_content}
            </span>
            <span className={`post-date ${verela.className}`}>
                {dayjs(post.created_at).format("D MMM YYYY - HH:mm")}
            </span>
            <span className="horizontal-line_1"></span>
        </div>
    );
}; 