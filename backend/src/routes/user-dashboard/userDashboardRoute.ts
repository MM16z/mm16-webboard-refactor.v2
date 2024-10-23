import { Router } from 'express';

import {
    createPostController,
    deletePostController,
    getUserPostsController,
    updatePostController,
} from '../../controllers/user-dashboard/controller.js';

const router = Router();

// GET /api/user-dashboard/
router.get('/get_user_posts', getUserPostsController);

// POST /api/user-dashboard/
router.post('/create_post', createPostController);
router.post('/update_post', updatePostController);
router.post('/delete_post', deletePostController);

export default router;
