import { Paper, Rating, Typography } from '@mui/material';
import './ReviewList.scss';
import ReviewsIcon from '@mui/icons-material/Reviews';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../../../context/AuthContext';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

interface Props {
    review: ReviewDB;
}
enum ReviewType {
    Book = 'Book',
    Movie = 'Movie',
    TV_Series = 'TV Servies',
    Computer_Game = 'Computer Game',
    Music_Album = 'Music Album',
    Board_Game = 'Board Game',
    Mobile_App = 'Mobile App',
    Other = 'Other',
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
            navigate(`/review/${review.review_id}`);
        }
    };

    const type = review.type;
    const typeValue = ReviewType[type as keyof typeof ReviewType];

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
            sx={{ padding: '0.5em 1em' }}
        >
            <div className='flex-column'>
                <div className='flex-row justify-between items-center'>
                    <Typography variant='h6'>{review.product}</Typography>
                    <Typography variant='caption'>{typeValue}</Typography>
                </div>

                <div className='flex-row justify-between items-center'>
                    <div className='flex-row items-center gap-1'>
                        <Typography variant='body1'>
                            {review.author.user_name}
                        </Typography>
                        <Rating
                            name='read-only'
                            value={review.average_rating}
                            precision={0.5}
                            readOnly
                            size='small'
                        />
                    </div>
                    <div className='flex-row items-center gap-1 width-fit'>
                        <ThumbUpIcon color='primary' sx={{ fontSize: '1em' }} />
                        <Typography variant='subtitle2'>
                            {review.likes.length}
                        </Typography>
                    </div>
                </div>
                <ReactMarkdown children={truncateText(review.text, 50)} />
            </div>
            {/* {review.images?.length > 0 ? (
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
                    <div className='flex-row items-center gap-1 width-fit'>
                        <ThumbUpIcon color='primary' sx={{ fontSize: '1em' }} />
                        <Typography variant='subtitle2'>
                            {review.likes.length}
                        </Typography>
                    </div>
                    <Rating
                        name='read-only'
                        value={review.average_rating}
                        precision={0.5}
                        readOnly
                        size='small'
                    />
                    <Typography variant='subtitle2'>
                        {review.author.user_name}
                    </Typography>
                </div>
            </div> */}
        </Paper>
    );
};
export default ReviewSummary;
