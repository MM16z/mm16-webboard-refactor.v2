import { Response } from 'express';

import { AuthenticatedRequest } from '../../middlewares/authMiddleware.js';
import userService from '../../services/user/service.js';

export const getAllUsersController = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        if (users && users.length > 0) {
            res.status(200).json(users);
        } else {
            res.status(404).json({ message: 'Users not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const getUserByIdController = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.decoded?.id;
    if (!userId) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }
    try {
        const user = await userService.getUserById(userId);
        if (user) {
            res.cookie('u_id', user.id, { httpOnly: true });
            res.status(200).json(user);
        } else {
            res.clearCookie('u_id');
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error });
    }
};
