import { Paper, Typography } from '@mui/material';
import './ReviewList.scss';
import ReviewsIcon from '@mui/icons-material/Reviews';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../Registration/AuthContext';

interface Props {
    review: ReviewDB;
}

const ReviewSummary = ({ review }: Props) => {
    const navigate = useNavigate();
    const { user } = useAuthContext();

    return (
        <Paper
            variant='outlined'
            className='review-summary'
            onClick={() =>
                navigate(
                    `/account/${user?.id_user}/user-review/${review.review_id}`
                )
            }
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
                    <Typography
                        variant='body2'
                        className='flex-row justify-start gap-2 items-center'
                    >
                        Rating:{' '}
                        <Typography variant='subtitle1'>
                            {review.score}/10
                        </Typography>
                    </Typography>
                </div>
                <div className='interact gap-1'>
                    <div className='flex-row items-center gap-1'>
                        <ThumbUpIcon color='primary' sx={{ fontSize: '1em' }} />
                        <Typography variant='subtitle2'>0</Typography>
                    </div>
                    <div className='flex-row items-center gap-1'>
                        <ModeCommentIcon
                            sx={{ fontSize: '1em' }}
                            color='primary'
                        />
                        <Typography variant='subtitle2'>0</Typography>
                    </div>
                </div>
            </div>
        </Paper>
    );
};
export default ReviewSummary;
