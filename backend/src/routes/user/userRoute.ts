import { Request, Router } from 'express';

import { getAllUsersController, getUserByIdController, uploadProfileImageController } from '../../controllers/user/controller.js';
import { upload } from '../../utils/uploadMiddlewares.js';

const router = Router();

export type MulterRequest = Request & {
    file: Express.Multer.File;
}

// GET /api/user/
router.get('/', getAllUsersController);
router.get('/get_user_by_id', getUserByIdController);

// POST /api/user/
router.post('/upload-profile-image', upload.single('image'), (req: Request, res) => {
    return uploadProfileImageController(req as MulterRequest, res);
});

export default router;
