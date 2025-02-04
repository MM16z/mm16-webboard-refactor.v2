
import type { Server, Socket } from 'socket.io';

import systemInfoHandler from './handlers/systemInfo.handler';
import { WebSocketHandler } from './types';

const handlers: WebSocketHandler[] = [
    systemInfoHandler,
];

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];

export function configureWebSocket(io: Server, role: string) {
    const allowHandlersList = [''];
    let allowHandlers: WebSocketHandler[] = [];

    if (role === 'admin') {
        allowHandlers = handlers;
    } else {
        allowHandlers = handlers.filter(handler => allowHandlersList.includes(handler.name));
    }

    io.on('connection', (socket: Socket) => {
        const origin = socket.handshake.headers.origin;
        // console.log(`New connection from: ${origin || 'unknown origin'}, ip: ${socket.handshake.address}`);

        if (!isValidOrigin(origin)) {
            console.log(`Blocking connection from invalid origin: ${origin}`, {
                ip: socket.handshake.address,
                headers: socket.handshake.headers
            });
            socket.disconnect(true);
            return;
        }
        console.log("Current client size", io.sockets.sockets.size);

        allowHandlers.forEach(handler => {
            try {
                handler.initialize(io, socket);
            } catch (error) {
                console.error(`Error initializing handler ${handler.name}:`, error);
            }
        });

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
            console.log('Total client size', io.sockets.sockets.size);
        });

        socket.on('custom_event', (data) => {
            console.log('Received custom event:', data);
        });
    });
    return io;
}

function isValidOrigin(origin?: string): boolean {
    if (!origin) return false;

    try {
        const url = new URL(origin);
        return allowedOrigins.includes(url.origin);
    } catch {
        return false;
    }
}
