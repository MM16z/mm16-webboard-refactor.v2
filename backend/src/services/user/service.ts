import { PrismaClient } from '@prisma/client';

import { UserModel } from '../../models/user/model.js';

const prisma = new PrismaClient();

const userService = {
    getAllUsers,
    getUserById,
    updateUser,
    updateUserRefreshToken,
    getUserByRefreshToken,
    updateUserProfileImage,
};

async function getAllUsers(): Promise<UserModel[]> {
    const users = await prisma.users.findMany();
    return users;
}

async function getUserById(id: number): Promise<UserModel | null> {
    const user = await prisma.users.findUnique({
        where: { id },
    });
    return user;
}

async function getUserByRefreshToken(refreshToken: string): Promise<UserModel | null> {
    const user = await prisma.users.findFirst({
        where: { refresh_token: refreshToken },
    });
    return user;
}

async function updateUser(id: number, userData: UserModel): Promise<UserModel | null> {
    const user = await prisma.users.update({
        where: { id },
        data: userData,
    });
    return user;
}

async function updateUserProfileImage(id: number, profileImage: string): Promise<UserModel | null> {
    const user = await prisma.users.update({
        where: { id },
        data: { profile_image: profileImage },
    });
    return user;
}

async function updateUserRefreshToken(id: number, refreshToken: string): Promise<UserModel | null> {
    const user = await prisma.users.update({
        where: { id },
        data: { refresh_token: refreshToken },
    });
    return user;
}

export default userService;
