import { useQuery } from '@tanstack/react-query';
import { fetchUserReviews } from '../services/review.services/fetchUserReviews';

export const useUserReviews = (
    user: User | null,
    token: string,
    requestedId: string | undefined
) => {
    const { isLoading, isError, data, error, isSuccess, isFetching } = useQuery(
        {
            queryKey: ['reviews', user?.id_user, requestedId],
            queryFn: async () => {
                if (!requestedId) throw new Error();
                const data = await fetchUserReviews(requestedId, token);
                return data.reviews;
            },
            refetchOnMount: true,
        }
    );

    return {
        isLoading,
        isError,
        data,
        error,
        isSuccess,
        isFetching,
    };
};
