import { useEffect } from 'react';

export const useRemoveNotification = (
    setNotification: React.Dispatch<React.SetStateAction<Notification | null>>
) => {
    useEffect(() => {
        return () => setNotification(null);
    }, [setNotification]);
};
