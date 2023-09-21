import { QueryClient, QueryKey, useQuery } from '@tanstack/react-query';
import { Params } from 'react-router-dom';
import { findReviewById } from './utils/findReviewById';
import { formatReview } from './utils/formatReview';
import { useEffect, useState } from 'react';
import { fetchReviewById } from '../services/review.services/fetchReviewById';

export const useSearchReviewCache = (
    params: Params,
    queryClient: QueryClient,
    user: User | null
) => {
    const [review, setReview] = useState<ReviewDB | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const cacheData: [queryKey: QueryKey, data: ReviewDB[] | undefined][] =
        queryClient.getQueriesData({
            queryKey: ['reviews'],
        });

    const foundReview = params.reviewId
        ? findReviewById(cacheData, params.reviewId)
        : null;

    const { isError, isSuccess, isFetching } = useQuery({
        queryKey: ['reviews', params.reviewId],
        queryFn: async () => {
            setIsLoading(true);
            if (!params.reviewId) return [];
            const data = await fetchReviewById(params.reviewId);
            setReview(data.review);
            setIsLoading(false);
            return [data.review];
        },
        enabled: foundReview === null,
        staleTime: 5 * 60 * 1000,
    });

    useEffect(() => {
        if (!params.reviewId) return;

        if (!foundReview) return;
        setReview(foundReview);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (review && !review?.editable && user) {
            const formated = formatReview(review, user);
            setReview(formated);
            setIsLoading(false);
        }
    }, [user, review]);

    if (isError) setIsLoading(false);

    return {
        review,
        isLoading,
        isError,
        isSuccess,
        isFetching,
    };
};
