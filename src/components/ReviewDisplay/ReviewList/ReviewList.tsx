import ReviewSummary from './ReviewSummary';

interface Props {
    data: ReviewDB[];
}

const ReviewList = ({ data }: Props) => {
    return (
        <div className='reviews-list'>
            {data.map((review) => {
                return <ReviewSummary review={review} key={review.review_id} />;
            })}
        </div>
    );
};

export default ReviewList;
