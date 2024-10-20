import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { UserModel } from '../models/user/model.js';

export type AuthenticatedRequest = {
    decoded?: UserModel;
} & Request;

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const cookies = req.headers.cookie;
    const refreshToken = cookies
        ?.split(';')
        .find((cookie) => cookie.trim().startsWith('jwtToken='))
        ?.split('=')[1];

    try {
        if (refreshToken && process.env.JWT_REFRESH_SECRET) {
            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET) as UserModel;
            req.decoded = decoded;
        }

        if (req.path.startsWith('/api/homepage')) {
            return next();
        } else if (!refreshToken) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        } else {
            return next();
        }
    } catch (error) {
        console.error('Token verification failed:', error);
        if (req.path.startsWith('/api/homepage')) {
            return next();
        }
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

export default authMiddleware;
