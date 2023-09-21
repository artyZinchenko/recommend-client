import { useQuery } from '@tanstack/react-query';
import { querySwitch } from './utils/querySwitch';

export const useReviewsQuery = (
    type: string | null,
    query: string | null,
    user: User | null
) => {
    const { isLoading, isError, isSuccess, data, error, isFetching } = useQuery(
        {
            queryKey: ['reviews', type, query],
            queryFn: async () => {
                const data = await querySwitch(type, query);
                if (!data) throw new Error('Failed to load data');
                return data.reviews;
            },
            staleTime: 5 * 60 * 1000,
        }
    );

    return {
        isLoading,
        isError,
        isSuccess,
        data,
        error,
        isFetching,
    };
};
