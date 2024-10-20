export type UserModel = {
    id?: number;
    email: string;
    password: string;
    username: string;
    create_at?: Date;
    refresh_token?: string | null;
};
