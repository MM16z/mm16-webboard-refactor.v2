import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import express from 'express';

import routes from './routes/routes';

const PORT = process.env.APP_PORT || 8000;

const app = express();
const prisma = new PrismaClient();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is runing.......');
});
app.use('/api', routes);

app.use((err: Error, req: express.Request, res: express.Response) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
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
