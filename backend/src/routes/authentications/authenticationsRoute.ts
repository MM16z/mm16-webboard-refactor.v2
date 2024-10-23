import { Router } from 'express';

import {
    loginController,
    logoutController,
    registerController,
} from '../../controllers/authentications/controller.js';
import authMiddleware from '../../middlewares/authMiddleware.js';

const router = Router();

// GET /api/authentications/
router.get('/');

// POST /api/authentications/
router.post('/register', registerController);
router.post('/login', loginController);
router.post('/logout', authMiddleware, logoutController);

export default router;
