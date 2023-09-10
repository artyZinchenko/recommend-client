import { useQueries, useQuery } from '@tanstack/react-query';
import { fetchBestReviews } from '../../../services/review.services/fetchBestReviews';
import { fetchLatestReviews } from '../../../services/review.services/fetchLatestReviews';
import { useIsLoading } from '../../../context/IsLoadingProvider';
import { useEffect } from 'react';
import ErrorComponent from '../../Exceptions/ErrorComponent';
import ReviewList from '../../ReviewDisplay/ReviewList/ReviewList';

interface Props {}
const LatestReviews = (props: Props) => {
    console.log('latest');
    const { setIsLoading } = useIsLoading();
    const { data, isLoading, isError, error, isSuccess } = useQuery({
        queryKey: ['reviews', 'latest-reviews'],
        queryFn: async () => {
            const data = await fetchLatestReviews();
            return data.reviews;
        },
    });

    useEffect(() => {
        return () => setIsLoading(false);
    }, []);

    if (isLoading) {
        setIsLoading(true);
    }

    if (isError) {
        setIsLoading(false);
        return <ErrorComponent error={error} />;
    }
    if (isSuccess) {
        setIsLoading(false);
        return <ReviewList data={data} />;
    }

    return null;
};

export default LatestReviews;
