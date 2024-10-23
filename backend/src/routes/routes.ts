import express from 'express';

// import os from 'os';
// import si from 'systeminformation';
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

// router.get('/system-info', async (req, res) => {
//     try {
//         const [time, memory, load, cpu, network] = await Promise.all([
//             si.time(),
//             si.mem(),
//             si.currentLoad(),
//             si.cpu(),
//             si.networkInterfaces()
//         ]);

//         const cpuCount = os.cpus().length;

//         const systemData = {
//             uptime: `${time.uptime} seconds`,
//             memory: {
//                 freeMem: `${(memory.free / 1024 / 1024).toFixed(2)} MB`,
//                 totalMem: `${(memory.total / 1024 / 1024).toFixed(2)} MB`,
//                 freeMemPercentage: `${((memory.free / memory.total) * 100).toFixed(2)}%`
//             },
//             loadAverage: load.currentLoad,
//             cpu: {
//                 cpuCount: cpuCount,
//                 cpuUsage: `${load.currentLoad.toFixed(2)}%`
//             },
//             networkInterfaces: network
//         };

//         res.json({ systemInfo: systemData });
//     } catch (error) {
//         console.error('Error gathering system information:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

export default router;
