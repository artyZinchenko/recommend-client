import SkeletonReviewSummary from '../../Skeleton/SkeletonReviewSummary';
import ReviewSummary from './ReviewSummary';

interface Props {
    data: ReviewDB[] | undefined;
}

const ReviewList = ({ data }: Props) => {
    if (!data) {
        return <SkeletonReviewSummary />;
    }
    return (
        <div className='reviews-list'>
            {data.map((review) => {
                return <ReviewSummary review={review} key={review.review_id} />;
            })}
        </div>
    );
};

export default ReviewList;
