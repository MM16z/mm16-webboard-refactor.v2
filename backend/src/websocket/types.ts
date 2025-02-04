import type { Server, Socket } from 'socket.io';

export type WebSocketHandler = {
    name: string;
    initialize(io: Server, socket: Socket): void;
}