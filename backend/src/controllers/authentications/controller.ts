import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { Response } from 'express';
import jwt from 'jsonwebtoken';

import { AuthenticatedRequest } from '../../middlewares/authMiddleware.js';
import { registerModel } from '../../models/authentications/model.js';
import { authenticationService } from '../../services/authentications/service.js';
import userService from '../../services/user/service.js';

dotenv.config();

const saltRounds = 10;

export const registerController = async (req: AuthenticatedRequest, res: Response) => {
    const { email, username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const userDataPayload: registerModel = {
            email,
            username,
            password: hashedPassword,
        };

        const user = await authenticationService.register(userDataPayload);
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                if (Array.isArray(error.meta?.target)) {
                    if (error.meta?.target[0] === 'email') {
                        return res.status(409).json({
                            code: 409,
                            reason: 'Conflict',
                            message: 'Email already exists',
                        });
                    }
                    if (error.meta?.target[0] === 'username') {
                        return res.status(409).json({
                            code: 409,
                            reason: 'Conflict',
                            message: 'Username already exists',
                        });
                    }
                }
            }
        }
        res.status(500).json({
            reason: 'Internal server error',
            message: 'An unexpected error occurred',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

export const loginController = async (req: AuthenticatedRequest, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await authenticationService.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({
                code: 404,
                reason: 'Not Found',
                message: 'User not found',
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                code: 401,
                reason: 'Unauthorized',
                message: 'Invalid password',
            });
        }

        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }
        if (!process.env.JWT_REFRESH_SECRET) {
            throw new Error('JWT_REFRESH_SECRET is not defined');
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
        );
        const refreshToken = jwt.sign(
            { id: user.id, email: user.email, username: user.username },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: '1d' },
        );

        const updateRefreshToken = await userService.updateUserRefreshToken(user.id, refreshToken);

        if (!updateRefreshToken) {
            throw new Error('Failed to update refresh token');
        }

        res.cookie('jwtToken', refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'none'
        });
        res.cookie('u_id', user.id, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });
        res.status(200).json({ accessToken: token });
    } catch (error) {
        console.log('LOGIN ERROR', error);
        res.status(500).json({
            reason: 'Internal server error',
            message: 'An unexpected error occurred',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

export const logoutController = async (req: AuthenticatedRequest, res: Response) => {
    const cookies = req.headers.cookie;
    const refreshToken = cookies
        ?.split(';')
        .find((cookie) => cookie.includes('jwtToken'))
        ?.split('=')[1];
    if (!refreshToken) {
        return res.status(204).json({ message: 'No content' });
    }
    try {
        const user = await userService.getUserByRefreshToken(refreshToken);
        if (!user) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        if (user.id) {
            await userService.updateUserRefreshToken(user.id, '');
        }
        res.clearCookie('jwtToken', { httpOnly: true, secure: true, sameSite: 'none' });
        return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({
            reason: 'Internal server error',
            message: 'An unexpected error occurred',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};
