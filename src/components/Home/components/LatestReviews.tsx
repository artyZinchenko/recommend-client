import { useQueries, useQuery } from '@tanstack/react-query';
import { fetchBestReviews } from '../../../services/review.services/fetchBestReviews';
import { fetchLatestReviews } from '../../../services/review.services/fetchLatestReviews';
import { useIsLoading } from '../../../context/IsLoadingProvider';
import { useEffect } from 'react';
import ErrorComponent from '../../Exceptions/ErrorComponent';
import ReviewList from '../../ReviewDisplay/ReviewList/ReviewList';
import { useHandleIsLoading } from '../../../hooks/useHandleIsLoading';

interface Props {}
const LatestReviews = (props: Props) => {
    const { setIsLoading } = useIsLoading();
    const { data, isLoading, isError, error, isSuccess } = useQuery({
        queryKey: ['reviews', 'latest-reviews'],
        queryFn: async () => {
            const data = await fetchLatestReviews();
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

export default LatestReviews;
