export type PostModel = {
    id?: number;
    user_id: number | undefined;
    post_username: string | undefined;
    post_title: string;
    post_content: string;
    created_at?: Date;
};
