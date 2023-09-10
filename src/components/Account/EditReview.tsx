import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { QueryKey, useQueryClient } from '@tanstack/react-query';
import ReviewForm from '../Review/ReviewForm';
import { useSearchReviewCache } from '../../hooks/useSearchReviewCache';
import RootReview from '../Review/RootReview';

const EditReview = () => {
    const params = useParams();
    const { user } = useAuthContext();
    const queryClient = useQueryClient();

    const review = useSearchReviewCache(params, queryClient, user);

    if (!review) return null;

    return <RootReview review={review} />;
};

export default EditReview;
