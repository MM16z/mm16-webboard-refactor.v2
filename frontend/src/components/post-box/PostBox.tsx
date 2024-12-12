import { PostBoxContainerType } from "@/models/components/post-boxType";
import { verela, silkscreen } from "@/fonts/fonts";
import { ProfileImageUpload } from "../profile/ProfileImageUpload";
import { useAppSelector } from "@/redux/hook";

function PostBoxContainer({ children, ...props }: PostBoxContainerType) {
    const { username, title, postcontent, postdate, userImage } = props;

    return (
        <div className="post-box-container">
            <span className="vertical-line"></span>
            <span className="vertical-line_1"></span>
            <span className="horizontal-line"></span>
            <ProfileImageUpload currentImageUrl={userImage ?? ''} showUploadSection={false} />
            <span className="username">{username}</span>
            <span className={`title`}>{title}</span>
            <span className="line5"></span>
            <span className="line6"></span>
            <span className={`post-content`}>{postcontent}</span>
            <span className={`text-right pr-4 font-bold tracking-[-0.10em] mt-2`}>{postdate}</span>
            <div
                className={`text-[15px] mt-[10px] ml-[20px] mb-[10px] opacity-75 font-bold`}
            >
                comments
            </div>
            {children}
            <span className="horizontal-line_1"></span>

        </div>
    );
}

export default PostBoxContainer;
