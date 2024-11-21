import { Response } from 'express';

import { AuthenticatedRequest } from '../../middlewares/authMiddleware.js';
import { MulterRequest } from '../../routes/user/userRoute.js';
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
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error });
    }
};

export const uploadProfileImageController = async (req: MulterRequest, res: Response) => {
    try {
        const userId = req.body.userId;

        const multerReq = req as unknown as MulterRequest;
        if (!multerReq.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const imageUrl = `/uploads/profile-images/${multerReq.file.filename}`;
        const updatedProfileImage = await userService.updateUserProfileImage(parseInt(userId), imageUrl);

        return res.json({
            success: true,
            imageUrl,
            fileDetails: {
                filename: multerReq.file.filename,
                size: multerReq.file.size,
                mimetype: multerReq.file.mimetype,
                path: multerReq.file.path
            },
            updatedProfileImage
        });
    } catch (error: unknown) {
        console.error('Error uploading image:', error);
        return res.status(500).json({
            success: false,
            message: 'Error uploading image',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}

