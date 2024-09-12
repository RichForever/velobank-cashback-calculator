import { useCallback } from 'react';

export const useCurrentDate = () => {
    return useCallback(() => {
        return new Date().toLocaleString('pl-PL', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    }, []);
};
