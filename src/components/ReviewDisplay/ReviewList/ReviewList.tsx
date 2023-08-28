import { useQuery } from '@tanstack/react-query';
import { useAuthContext } from '../../Registration/AuthContext';
import { fetchUserReviews } from '../../../services/review.services/fetchUserReviews';
import { useParams } from 'react-router-dom';
import ReviewSummary from './ReviewSummary';

interface Props {
    requestedId: string | undefined;
}

const ReviewList = ({ requestedId }: Props) => {
    const { user, token } = useAuthContext();

    const { isLoading, isError, data, error } = useQuery({
        queryKey: [user?.id_user, 'reviews'],
        queryFn: async () => {
            if (!requestedId) throw new Error();
            const data = await fetchUserReviews(requestedId, token);
            console.log(data.reviews);
            return data.reviews;
        },
    });

    if (isLoading) {
        return <span>Loading...</span>;
    }

    return (
        <div className='reviews-list'>
            {data?.map((review) => {
                return <ReviewSummary review={review} key={review.review_id} />;
            })}
        </div>
    );
};

export default ReviewList;
