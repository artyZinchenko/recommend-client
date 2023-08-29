import { useQuery } from '@tanstack/react-query';
import { fetchReviews } from '../services/review.services/fetchReviews';
import { formatReviews } from './utils/formatReviews';

export const useReviews = (user: User | null) => {
    const { isLoading, isError, data, error } = useQuery({
        queryKey: [user?.id_user, 'all-reviews'],
        queryFn: async () => {
            const data = await fetchReviews();
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
