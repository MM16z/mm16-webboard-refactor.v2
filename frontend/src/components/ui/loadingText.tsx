import React from 'react';
import { cn } from "@/lib/utils";

interface LoadingTextProps {
    text?: string;
    className?: string;
}

const LoadingText = ({ text = "Loading...", className }: LoadingTextProps) => {
    return (
        <div className={cn(
            "fixed inset-0 flex items-center justify-center z-50",
            className
        )}>
            <div className="flex items-center text-4xl font-bold text-primary text-purple-700">
                {text.split('').map((char, index) => (
                    <span
                        key={index}
                        className="inline-block animate-bounce"
                        style={{
                            animationDelay: `${index * 0.1}s`
                        }}
                    >
                        {char}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default LoadingText;
