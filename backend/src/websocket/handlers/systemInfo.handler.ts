import os from 'os';
import { Server, Socket } from "socket.io";
import si from 'systeminformation';

import { WebSocketHandler } from "../types.js";

const systemInfoHandler: WebSocketHandler = {
    name: "systemInfo",
    initialize(io: Server, socket: Socket) {
        const sendSystemData = async (target: Socket | Server) => {
            try {
                const [time, memory, load, network] = await Promise.all([
                    si.time(),
                    si.mem(),
                    si.currentLoad(),
                    si.cpu(),
                    si.networkInterfaces()
                ]);

                const systemData = {
                    uptime: `${time.uptime} seconds`,
                    memory: {
                        freeMem: `${(memory.free / 1024 / 1024).toFixed(2)} MB`,
                        totalMem: `${(memory.total / 1024 / 1024).toFixed(2)} MB`,
                        freeMemPercentage: `${((memory.free / memory.total) * 100).toFixed(2)}%`
                    },
                    loadAverage: load.currentLoad,
                    cpu: {
                        cpuCount: os.cpus().length,
                        cpuUsage: `${load.currentLoad.toFixed(2)}%`
                    },
                    networkInterfaces: network
                };

                target.emit('system_info', systemData);
                return systemData;
            } catch (error) {
                console.error('WebSocket error:', error);
                return null;
            }
        };

        let interval: NodeJS.Timeout;

        if (io.sockets.sockets.size > 0) {
            interval = setInterval(() => {
                sendSystemData(socket);
            }, 3000);
        }

        socket.on('disconnect', (reason) => {
            clearInterval(interval);
            console.log(`SystemInfo Disconnected (${reason})`);
        });
    }
}

export default systemInfoHandler;