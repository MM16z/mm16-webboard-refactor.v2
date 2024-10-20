import { PrismaClient } from '@prisma/client';

import { registerModel } from '../../models/authentications/model.js';

const prisma = new PrismaClient();

export const authenticationService = {
    register,
    getUserByEmail,
};

async function register(userData: registerModel) {
    const user = await prisma.user.create({
        data: userData,
    });
    return user;
}

async function getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
        where: { email },
    });
    return user;
}
