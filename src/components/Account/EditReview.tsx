import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { useQueryClient } from '@tanstack/react-query';
import { useSearchReviewCache } from '../../hooks/useSearchReviewCache';
import RootReview from '../Review/RootReview';
import { useIsLoading } from '../../context/IsLoadingProvider';
import { useHandleIsLoading } from '../../hooks/useHandleIsLoading';

const EditReview = () => {
    const params = useParams();
    const { user } = useAuthContext();
    const queryClient = useQueryClient();
    const { setIsLoading } = useIsLoading();

    const { review, isLoading, isError, isSuccess, isFetching } =
        useSearchReviewCache(params, queryClient, user);

    useHandleIsLoading(setIsLoading, isLoading, isSuccess, isError, isFetching);

    if (!review) return null;

    return <RootReview review={review} />;
};

export default EditReview;
