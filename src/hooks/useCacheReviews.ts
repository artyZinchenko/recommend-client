import { QueryClient } from '@tanstack/react-query';
import { Params } from 'react-router-dom';

export const useCacheReviews = (
    params: Params,
    queryClient: QueryClient,
    user: User | null
) => {
    function getData(): ReviewDB[] | undefined {
        switch (!!params.userId) {
            case true:
                return queryClient.getQueryData([user?.id_user, 'reviews']);
            case false:
                return queryClient.getQueryData([user?.id_user, 'all-reviews']);
            default:
                return undefined;
        }
    }

    const data = getData();
    if (!data) return null;

    return data.find((review) => {
        return review.review_id === params.reviewId;
    });
};
