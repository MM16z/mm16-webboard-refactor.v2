import { useState, useCallback, useEffect } from 'react';

export const useDebounce = (delay: number) => {
    const [isDebouncing, setIsDebouncing] = useState(false);

    const startDebounce = useCallback(() => {
        setIsDebouncing(true);
    }, []);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        if (isDebouncing) {
            timeoutId = setTimeout(() => {
                setIsDebouncing(false);
            }, delay);
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [isDebouncing, delay]);

    return {
        isDebouncing,
        startDebounce,
    };
}; 