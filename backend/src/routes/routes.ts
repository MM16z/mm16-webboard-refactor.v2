import express from 'express';

import authMiddleware from '../middlewares/authMiddleware.js';
import authRoutes from './authentications/authenticationsRoute.js';
import homeRoutes from './homepage/homepageRoute.js';
import userRoutes from './user/userRoute.js';
import userDashboardRoutes from './user-dashboard/userDashboardRoute.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/homepage', homeRoutes);
router.use('/user', authMiddleware, userRoutes);
router.use('/user-dashboard', authMiddleware, userDashboardRoutes);

export default router;
