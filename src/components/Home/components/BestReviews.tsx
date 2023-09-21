import { useQuery } from '@tanstack/react-query';
import { fetchBestReviews } from '../../../services/review.services/fetchBestReviews';
import { useIsLoading } from '../../../context/IsLoadingProvider';
import ReviewList from '../../ReviewDisplay/ReviewList/ReviewList';
import { useHandleIsLoading } from '../../../hooks/useHandleIsLoading';

const BestReviews = () => {
    const { setIsLoading } = useIsLoading();

    const { data, isLoading, isError, isSuccess, isFetching } = useQuery({
        queryKey: ['reviews', 'best-reviews'],
        queryFn: async () => {
            const data = await fetchBestReviews();
            return data.reviews;
        },
    });

    useHandleIsLoading(setIsLoading, isLoading, isSuccess, isError, isFetching);

    return <ReviewList data={data} />;
};
export default BestReviews;
