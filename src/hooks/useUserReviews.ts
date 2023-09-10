import { useQuery } from '@tanstack/react-query';
import { fetchUserReviews } from '../services/review.services/fetchUserReviews';
import { formatReviews } from './utils/formatReviews';

export const useUserReviews = (
    user: User | null,
    token: string,
    requestedId: string | undefined
) => {
    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['reviews', user?.id_user],
        queryFn: async () => {
            if (!requestedId) throw new Error();
            const data = await fetchUserReviews(requestedId, token);
            return formatReviews(data.reviews, user);
        },
    });

    return {
        isLoading,
        isError,
        data,
        error,
    };
};
