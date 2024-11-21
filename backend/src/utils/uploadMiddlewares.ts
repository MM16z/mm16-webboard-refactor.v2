import fs from 'fs';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const initializeUploadDirectories = () => {
    const baseUploadPath = path.join(__dirname, '../../uploads');
    const profileImagesPath = path.join(baseUploadPath, 'profile-images');

    [baseUploadPath, profileImagesPath].forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    });
};
export const storage = multer.diskStorage({
    destination: (_req: Express.Request, _file: Express.Multer.File, cb) => {
        const uploadPath = path.join(__dirname, '../../uploads/profile-images');
        cb(null, uploadPath);
    },
    filename: (_req: Express.Request, file: Express.Multer.File, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = `${uniqueSuffix}${path.extname(file.originalname)}`;
        cb(null, filename);
    }
});

export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (_req: Express.Request, file: Express.Multer.File, cb: FileFilterCallback) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPEG, PNG and WebP are allowed.'));
        }
    }
});