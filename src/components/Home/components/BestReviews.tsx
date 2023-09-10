import { useQueries, useQuery } from '@tanstack/react-query';
import { fetchBestReviews } from '../../../services/review.services/fetchBestReviews';
import ErrorComponent from '../../Exceptions/ErrorComponent';
import { useIsLoading } from '../../../context/IsLoadingProvider';
import ReviewList from '../../ReviewDisplay/ReviewList/ReviewList';
import { useEffect } from 'react';

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
export default BestReviews;
