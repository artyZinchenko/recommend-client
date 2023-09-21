import { useQuery } from '@tanstack/react-query';
import { fetchLatestReviews } from '../../../services/review.services/fetchLatestReviews';
import { useIsLoading } from '../../../context/IsLoadingProvider';
import ReviewList from '../../ReviewDisplay/ReviewList/ReviewList';
import { useHandleIsLoading } from '../../../hooks/useHandleIsLoading';

const LatestReviews = () => {
    const { setIsLoading } = useIsLoading();
    const { data, isLoading, isError, isSuccess, isFetching } = useQuery({
        queryKey: ['reviews', 'latest-reviews'],
        queryFn: async () => {
            const data = await fetchLatestReviews();
            return data.reviews;
        },
    });

    useHandleIsLoading(setIsLoading, isLoading, isSuccess, isError, isFetching);

    return <ReviewList data={data} />;
};

export default LatestReviews;
