import { useParams } from 'react-router-dom';
import { useAuthContext } from '../Registration/AuthContext';
import { useQueryClient } from '@tanstack/react-query';
import ReviewForm from '../Review/ReviewForm';

const EditReview = () => {
    const { reviewId } = useParams();
    const { user } = useAuthContext();
    const queryClient = useQueryClient();
    console.log('EDIT');

    const data: ReviewDB[] | undefined = queryClient.getQueryData([
        user?.id_user,
        'reviews',
    ]);
    console.log(reviewId, data);

    if (!data) return null;
    const review = data.find((review: ReviewDB) => {
        return review.review_id === reviewId;
    });
    if (!review) return null;

    return <ReviewForm review={review} />;
};

export default EditReview;
