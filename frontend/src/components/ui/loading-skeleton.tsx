import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { Loader2 } from "lucide-react";

const LoadingSkeleton = () => {
    return (
        <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
            {/* Profile Loading */}
            <div className="flex items-center space-x-4 mb-8">
                <Skeleton circle width={50} height={50} />
                <Skeleton width={200} height={24} />
            </div>

            {/* Post Form Loading */}
            <div className="space-y-2">
                <Skeleton height={80} />
                <Skeleton height={120} />
                <Skeleton width={100} height={40} />
            </div>

            {/* Posts Loading */}
            <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center space-x-2">
                            <Skeleton circle width={40} height={40} />
                            <Skeleton width={150} />
                        </div>
                        <Skeleton count={2} />
                        <Skeleton width="60%" />
                    </div>
                ))}
            </div>

            {/* Loading Spinner */}
            <div className="flex justify-center items-center py-4">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
        </div>
    );
}

export default LoadingSkeleton;
