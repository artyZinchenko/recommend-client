import { useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../../../context/AuthContext';
import './DetailedReview.scss';
import ImagesCarousel from './ImagesDisplay';
import { Avatar, Button, Paper, Rating, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { useSearchReviewCache } from '../../../hooks/useSearchReviewCache';
import CommentSection from './CommentSection/CommentSection';
import Like from './Feedback/Like';
import Feedback from './Feedback/Feedback';
import GradeIcon from '@mui/icons-material/Grade';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

interface Props {}

const DetailedReview = (props: Props) => {
    const params = useParams();
    const { user, token } = useAuthContext();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const review = useSearchReviewCache(params, queryClient, user);
    if (!review) return null;

    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    return (
        <div className='detailed-review'>
            <div className='flex-column gap-1'>
                <div className='flex-row items-center gap-1'>
                    <Avatar />
                    <Typography>{review.author.user_name}</Typography>
                </div>
                <div>
                    <Typography variant='caption'>
                        {new Date(review.create_date).toLocaleDateString(
                            'fr-FR',
                            options
                        )}
                    </Typography>
                </div>
                <div className='flex-row items-center gap-1'>
                    <GradeIcon color='primary' />
                    <Typography>{review.score}/10</Typography>
                    <Typography variant='h6'>{review.product}</Typography>
                </div>

                <div className='flex-row items-center gap-1 pt-4'>
                    <Typography variant='h6'>{review.name}</Typography>
                    <div className='flex-row items-center gap-1 width-fit pl-2'>
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
                </div>
                {review.editable && (
                    <Button
                        onClick={() => {
                            navigate(
                                `/account/${user?.id_user}/user-review/${review.review_id}/edit`
                            );
                        }}
                    >
                        Edit
                    </Button>
                )}
                <ImagesCarousel images={review.images} />
                <Paper sx={{ padding: '1em' }}>
                    <ReactMarkdown
                        children={review.text}
                        className='markdown'
                    />
                </Paper>
                <CommentSection user={user} params={params} />
                <Feedback
                    user={user}
                    params={params}
                    token={token}
                    review={review}
                />
            </div>
        </div>
    );
};

export default DetailedReview;
