import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import express, { NextFunction } from 'express';
import { MulterError } from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

import routes from './routes/routes.js';
import { initializeUploadDirectories } from './utils/uploadMiddlewares.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const APP_PORT = process.env.APP_PORT || 8001;

const app = express();
const prisma = new PrismaClient();

const allowedOrigins = [
    'https://mm16-webboard.vercel.app',
    'https://mm16-webboard.vercel.app/',
    'mm16-webboard.vercel.app',
    'mm16-webboard.vercel.app/',
    'http://localhost:3000',
    'http://localhost:5173'
];

const isDevelopment = process.env.NODE_ENV === 'development';

app.use(cors({
    origin: isDevelopment ? true : allowedOrigins,
    credentials: true
}));

app.use(express.json());

const uploadsPath = path.join(__dirname, '../uploads');
app.use('/uploads', express.static(uploadsPath));

initializeUploadDirectories();

app.get('/', (req, res) => {
    res.send('Server is runing.......');
});
app.use('/api', routes);

app.use((err: Error, req: express.Request, res: express.Response, next: NextFunction) => {
    if (err instanceof MulterError) {
        console.error('Multer error:', err);
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }

    if (err.message.includes('Invalid file type')) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }

    next(err);
});

app.use((err: Error, _req: express.Request, res: express.Response) => {
    console.error('Error (err.message):', err.message);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: err.message
    });
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

const server = app.listen(APP_PORT, () => {
    console.log(`Server is running on port ${APP_PORT}`);
});

process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
        prisma.$disconnect();
        process.exit(0);
    });
});

export { app, prisma };
