import { QueryClient, QueryKey } from '@tanstack/react-query';
import { Params } from 'react-router-dom';
import { findReviewById } from './utils/findReviewById';

export const useSearchReviewCache = (
    params: Params,
    queryClient: QueryClient,
    user: User | null
) => {
    const data: [queryKey: QueryKey, data: ReviewDB[] | undefined][] =
        queryClient.getQueriesData({
            queryKey: [user?.id_user],
        });
    if (!params.reviewId || !data) return null;

    const review = findReviewById(data, params.reviewId);

    return review;
};
