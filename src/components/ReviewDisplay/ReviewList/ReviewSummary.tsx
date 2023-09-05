import { Paper, Rating, Typography } from '@mui/material';
import './ReviewList.scss';
import ReviewsIcon from '@mui/icons-material/Reviews';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../../../context/AuthContext';

interface Props {
    review: ReviewDB;
}

const ReviewSummary = ({ review }: Props) => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const params = useParams();

    const handleClick = () => {
        if (params.userId) {
            navigate(
                `/account/${user?.id_user}/user-review/${review.review_id}`
            );
        } else {
            navigate(`review/${review.review_id}`);
        }
    };

    return (
        <Paper
            variant='outlined'
            className='review-summary'
            onClick={handleClick}
        >
            {review.images?.length > 0 ? (
                <div className='summary-image-container'>
                    <img src={review.images[0]} alt={`${review.name}`} />
                </div>
            ) : (
                <div className='icon-container'>
                    <ReviewsIcon sx={{ fontSize: '4em' }} />
                </div>
            )}
            <div className='summary-text-content'>
                <div className='flex-column'>
                    <Typography variant='overline'>{review.product}</Typography>
                    <Typography variant='h6'>{review.name}</Typography>
                    <div className='flex-row justify-start gap-2 items-center'>
                        <Typography variant='body2'>Rating: </Typography>
                        <Typography variant='subtitle1'>
                            {review.score}/10
                        </Typography>
                    </div>
                </div>
                <div className='interact gap-1'>
                    <Rating
                        name='read-only'
                        value={review.average_rating}
                        precision={0.5}
                        readOnly
                        size='small'
                    />
                    <div className='flex-row items-center gap-1 width-fit'>
                        <ThumbUpIcon color='primary' sx={{ fontSize: '1em' }} />
                        <Typography variant='subtitle2'>
                            {review.likes.length}
                        </Typography>
                    </div>
                </div>
            </div>
        </Paper>
    );
};
export default ReviewSummary;
