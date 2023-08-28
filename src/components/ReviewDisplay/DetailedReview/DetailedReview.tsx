import { useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../../Registration/AuthContext';
import './DetailedReview.scss';
import ImagesCarousel from './ImagesCarousel';
import { TYPOGRAPHY } from '@primer/react/lib/constants';
import { Button, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';

interface Props {}

const DetailedReview = (props: Props) => {
    const { reviewId } = useParams();
    const { user } = useAuthContext();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const data: ReviewDB[] | undefined = queryClient.getQueryData([
        user?.id_user,
        'reviews',
    ]);
    if (!data) return null;
    const review = data.find((review: ReviewDB) => {
        return review.review_id === reviewId;
    });
    if (!review) return null;

    console.log(review.tags);
    return (
        <div className='detailed-review'>
            <div className='flex-row justify-between'>
                <Typography variant='h6'>{review.name}</Typography>
                <Button
                    onClick={() => {
                        navigate('edit');
                    }}
                >
                    Edit
                </Button>
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
        </div>
    );
};

export default DetailedReview;
