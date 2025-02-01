export const isAdmin = (userId: number | null) => {
    if (userId === null) return false;

    const adminIds = (process.env.NEXT_PUBLIC_ADMIN_ID?.split(',') || [])
        .map(id => Number(id))
        .filter(n => !isNaN(n));

    return adminIds.includes(userId);
};
