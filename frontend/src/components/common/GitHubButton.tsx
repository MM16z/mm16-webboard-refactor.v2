'use client';

import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { Github } from 'lucide-react';
import { cn } from '@/lib/utils';

const GitHubButton = () => {
    const [isDragging, setIsDragging] = useState(false);
    const dragStartTime = useRef<number>(0);
    // const defaultPosition = { x: typeof window !== 'undefined' ? window.innerWidth - 100 : 0, y: 20 };

    // const handleStart = () => {
    //     dragStartTime.current = Date.now();
    //     setIsDragging(true);
    // };

    // const handleStop = () => {
    //     const dragDuration = Date.now() - dragStartTime.current;
    //     setIsDragging(false);

    //     if (dragDuration < 200) {
    //         window.open('https://github.com/MM16z/mm16-webboard-v.refactor', '_blank');
    //     }
    // };

    return (
        <Draggable
            // defaultPosition={defaultPosition}
            // onStart={handleStart}
            // onStop={handleStop}
            onMouseDown={() => { window.open('https://github.com/MM16z/mm16-webboard-v.refactor', '_blank'); }}
            bounds="body"
        >
            <div
                className={cn(
                    "fixed z-50 select-none p-4 rounded-full",
                    "bg-black hover:bg-gray-800 transition-colors",
                    "shadow-lg hover:shadow-xl",
                    !isDragging && "animate-pulse-scale",
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