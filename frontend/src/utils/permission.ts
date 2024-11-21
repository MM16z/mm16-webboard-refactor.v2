export const isAdmin = (userId: number | null) => {
    if (userId === null) return false;
    return userId === Number(process.env.NEXT_PUBLIC_ADMIN_ID);
};
