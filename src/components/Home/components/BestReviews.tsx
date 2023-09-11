import { useQueries, useQuery } from '@tanstack/react-query';
import { fetchBestReviews } from '../../../services/review.services/fetchBestReviews';
import ErrorComponent from '../../Exceptions/ErrorComponent';
import { useIsLoading } from '../../../context/IsLoadingProvider';
import ReviewList from '../../ReviewDisplay/ReviewList/ReviewList';
import { useEffect } from 'react';
import { useHandleIsLoading } from '../../../hooks/useHandleIsLoading';

interface Props {}
const BestReviews = (props: Props) => {
    const { setIsLoading } = useIsLoading();

    const { data, isLoading, isError, error, isSuccess } = useQuery({
        queryKey: ['reviews', 'best-reviews'],
        queryFn: async () => {
            const data = await fetchBestReviews();
            return data.reviews;
        },
    });

    useHandleIsLoading(setIsLoading, isLoading, isSuccess, isError);

    if (isError) {
        return <ErrorComponent error={error} />;
    }
    if (isSuccess) {
        return <ReviewList data={data} />;
    }

    return null;
};
export default BestReviews;
