import { PrismaClient } from '@prisma/client';

import { UserModel } from '../../models/user/model.js';

const prisma = new PrismaClient();

const userService = {
    getAllUsers,
    getUserById,
    updateUser,
    updateUserRefreshToken,
    getUserByRefreshToken,
};

async function getAllUsers(): Promise<UserModel[]> {
    const users = await prisma.user.findMany();
    return users;
}

async function getUserById(id: number): Promise<UserModel | null> {
    const user = await prisma.user.findUnique({
        where: { id },
    });
    return user;
}

async function getUserByRefreshToken(refreshToken: string): Promise<UserModel | null> {
    const user = await prisma.user.findFirst({
        where: { refresh_token: refreshToken },
    });
    return user;
}

async function updateUser(id: number, userData: UserModel): Promise<UserModel | null> {
    const user = await prisma.user.update({
        where: { id },
        data: userData,
    });
    return user;
}

async function updateUserRefreshToken(id: number, refreshToken: string): Promise<UserModel | null> {
    const user = await prisma.user.update({
        where: { id },
        data: { refresh_token: refreshToken },
    });
    return user;
}

export default userService;
