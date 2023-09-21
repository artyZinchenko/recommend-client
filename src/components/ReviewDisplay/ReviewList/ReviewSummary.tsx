import { Avatar, Paper, Rating, Typography, useTheme } from '@mui/material';
import './ReviewList.scss';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../../../context/AuthContext';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useTranslation } from 'react-i18next';

interface Props {
    review: ReviewDB;
}

const ReviewSummary = ({ review }: Props) => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const params = useParams();
    const { t } = useTranslation();
    const theme = useTheme();

    const handleClick = () => {
        if (params.userId) {
            navigate(
                `/account/${user?.id_user}/user-reviews/${review.review_id}`
            );
        } else {
            navigate(`/review/${review.review_id}`);
        }
    };

    function truncateText(text: string, maxLength: number) {
        if (text.length <= maxLength) {
            return '&ldquo;' + text + '&ldquo;';
        }
        return '&ldquo;' + text.slice(0, maxLength) + '...' + '&ldquo;';
    }

    return (
        <Paper
            variant='outlined'
            className='review-summary'
            onClick={handleClick}
            sx={{
                padding: '0.5em 1em',
                backgroundColor: theme.palette.action.hover,
            }}
        >
            <div className='flex-column'>
                <div className='flex-row justify-between items-center'>
                    <div className='flex-row justify-start items-center gap-2 flex-wrap width-fit'>
                        <Typography variant='h6'>
                            {review.product.product_name}
                        </Typography>
                        <Rating
                            name='read-only'
                            value={review.product.average_rating}
                            precision={0.5}
                            readOnly
                            size='small'
                        />
                    </div>
                    <Typography
                        variant='caption'
                        sx={{ textAlign: 'end', maxWidth: 'min-content' }}
                    >
                        {t(`product.${review.product.type}`)}
                    </Typography>
                </div>

                <div className='flex-row justify-start items-center gap-1'>
                    <Avatar sx={{ width: 24, height: 24 }} />
                    <Typography variant='subtitle2'>
                        {review.author.user_name}
                    </Typography>
                </div>

                <div className='flex-row justify-start items-center gap-2'>
                    <Typography variant='button'>{review.name}</Typography>

                    <div className='flex-row items-center gap-1 width-fit'>
                        <ThumbUpIcon color='primary' sx={{ fontSize: '1em' }} />
                        <Typography variant='subtitle2'>
                            {review.likes.length}
                        </Typography>
                    </div>
                </div>
                <ReactMarkdown children={truncateText(review.text, 50)} />
            </div>
        </Paper>
    );
};

export default ReviewSummary;
