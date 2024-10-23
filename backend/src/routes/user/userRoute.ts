import { Router } from 'express';

import { getAllUsersController, getUserByIdController } from '../../controllers/user/controller.js';

const router = Router();

// GET /api/user/
router.get('/', getAllUsersController);
router.get('/get_user_by_id', getUserByIdController);

// POST /api/user/

export default router;
