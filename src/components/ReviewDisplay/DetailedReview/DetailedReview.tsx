import { useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../../Registration/AuthContext';
import './DetailedReview.scss';
import ImagesCarousel from './ImagesDisplay';
import { Button, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { useCacheReviews } from '../../../hooks/useCacheReviews';
import CommentSection from './CommentSection/CommentSection';

interface Props {}

const DetailedReview = (props: Props) => {
    const params = useParams();
    const { user } = useAuthContext();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const review = useCacheReviews(params, queryClient, user);
    if (!review) return null;

    return (
        <div className='detailed-review'>
            <div className='flex-row justify-between'>
                <Typography variant='h6'>{review.name}</Typography>
                {review.editable && (
                    <Button
                        onClick={() => {
                            navigate(
                                `/account/${user?.id_user}/user-review/${review.review_id}`
                            );
                        }}
                    >
                        Edit
                    </Button>
                )}
            </div>
            <Typography variant='overline'>{review.product}</Typography>
            <Typography>Score: {review.score}/10</Typography>
            <ImagesCarousel images={review.images} />
            <div className='flex-row'>
                {review.tags.map((el: TagObject) => {
                    return (
                        <Typography variant='subtitle2'>
                            #{el.tag.tag_name}
                        </Typography>
                    );
                })}
            </div>
            <ReactMarkdown children={review.text} />
            <CommentSection user={user} params={params} />
        </div>
    );
};

export default DetailedReview;
