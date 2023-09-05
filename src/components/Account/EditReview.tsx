import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { QueryKey, useQueryClient } from '@tanstack/react-query';
import ReviewForm from '../Review/ReviewForm';
import { useSearchReviewCache } from '../../hooks/useSearchReviewCache';

const EditReview = () => {
    const params = useParams();
    const { user } = useAuthContext();
    const queryClient = useQueryClient();
    const { reviewId } = params;

    const review = useSearchReviewCache(params, queryClient, user);

    if (!review) return null;

    return <ReviewForm review={review} />;
};

export default EditReview;
