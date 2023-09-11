import { useEffect } from 'react';

export const useHandleIsLoading = (
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    isLoading: boolean,
    isSuccess: boolean,
    isError: boolean
) => {
    useEffect(() => {
        return () => setIsLoading(false);
    }, []);

    useEffect(() => {
        if (isLoading) {
            setIsLoading(true);
        }
        if (isSuccess) {
            setIsLoading(false);
        }
        if (isError) {
            setIsLoading(false);
        }
    }, [isSuccess, isLoading, isError]);
};
