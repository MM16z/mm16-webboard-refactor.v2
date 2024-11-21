'use client';

import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { Github } from 'lucide-react';
import { cn } from '@/lib/utils';

const GitHubButton = () => {
    const [position, setPosition] = useState({ x: window.innerWidth - 100, y: 50 });
    const [isDragging, setIsDragging] = useState(false);
    const dragStartTime = useRef<number>(0);

    const handleStart = () => {
        dragStartTime.current = Date.now();
        setIsDragging(true);
    };

    const handleStop = () => {
        const dragDuration = Date.now() - dragStartTime.current;
        setIsDragging(false);

        if (dragDuration < 200) {
            window.open('https://github.com/MM16z/mm16-webboard-v.refactor', '_blank');
        }
    };

    const handleDrag = (_e: any, data: { x: number; y: number }) => {
        setPosition({ x: data.x, y: data.y });
    };

    return (
        <Draggable
            position={position}
            onStart={handleStart}
            onStop={handleStop}
            onDrag={handleDrag}
            bounds="body"
        >
            <div
                className={cn(
                    "fixed z-50 select-none p-4 rounded-full",
                    "bg-black hover:bg-gray-800 transition-colors",
                    "shadow-lg hover:shadow-xl",
                    isDragging ? "cursor-grabbing" : "cursor-pointer"
                )}
                aria-label="View source on GitHub"
            >
                <Github className="w-6 h-6 text-white" />
            </div>
        </Draggable>
    );
};

export default GitHubButton;