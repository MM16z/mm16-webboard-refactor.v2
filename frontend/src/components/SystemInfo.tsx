'use client'

import { homepageApiService } from '@/api/homepageService';
import { useEffect, useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { silkscreen } from '@/fonts/fonts';

import { io } from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_WS_URL as string, {
    transports: ['websocket'],
    secure: true,
})
interface SystemInfoData {
    uptime: string;
    memory: {
        freeMem: string;
        totalMem: string;
        freeMemPercentage: string;
    };
    loadAverage: number;
    cpu: {
        cpuCount: number;
        cpuUsage: string;
    };
}

const ProgressBar = ({ percentage }: { percentage: number }) => {
    const filledBlocks = Math.round(percentage / 10);
    const emptyBlocks = 10 - filledBlocks;

    return (
        <div className="flex items-center space-x-1">
            {[...Array(filledBlocks)].map((_, i) => (
                <div key={`filled-${i}`} className="w-2 h-3 bg-green-500"></div>
            ))}
            {[...Array(emptyBlocks)].map((_, i) => (
                <div key={`empty-${i}`} className="w-2 h-3 bg-gray-300"></div>
            ))}
            <span className="ml-1">{percentage.toFixed(0)}%</span>
        </div>
    );
};

const formatUptime = (uptimeInSeconds: number): string => {
    const days = Math.floor(uptimeInSeconds / (24 * 60 * 60));
    const hours = Math.floor((uptimeInSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((uptimeInSeconds % (60 * 60)) / 60);
    const seconds = Math.floor(uptimeInSeconds % 60);

    const parts = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);

    return parts.join(' ');
};

const SystemInfo = () => {
    const nodeRef = useRef<HTMLElement>(null);
    const [systemInfo, setSystemInfo] = useState<SystemInfoData | null>(null);

    useEffect(() => {
        const handleSystemInfo = (data: SystemInfoData) => {
            setSystemInfo(data);
        };

        socket.on('system_info', handleSystemInfo);

        return () => {
            socket.off('system_info', handleSystemInfo);
        };
    }, []);

    if (!systemInfo) return null;

    const memoryUsage = 100 - parseFloat(systemInfo.memory.freeMemPercentage);
    const cpuUsage = parseFloat(systemInfo.cpu.cpuUsage);
    const uptimeInSeconds = parseFloat(systemInfo.uptime.split(' ')[0]);
    const formattedUptime = formatUptime(uptimeInSeconds);

    return (
        <Draggable nodeRef={nodeRef as React.RefObject<HTMLElement>} defaultPosition={{ x: window.innerWidth - 300, y: window.innerHeight - 200 }}>
            <div ref={nodeRef as React.RefObject<HTMLDivElement>} className={`${silkscreen.className} fixed bg-black bg-opacity-70 text-white p-2 rounded-md shadow-md z-50 text-xs cursor-move opacity-80`}>
                <h3 className="font-bold mb-1">System Info (EC2 Free Tier)</h3>
                <div className="grid grid-cols-[auto,1fr] gap-x-2 gap-y-1">
                    <div>Uptime:</div>
                    <div>{formattedUptime}</div>
                    <div>Memory:</div>
                    <ProgressBar percentage={memoryUsage} />
                    <div>CPU:</div>
                    <ProgressBar percentage={cpuUsage} />
                    <div>Load:</div>
                    <div>{systemInfo.loadAverage.toFixed(2)}</div>
                </div>
            </div>
        </Draggable>
    );
};

export default SystemInfo;