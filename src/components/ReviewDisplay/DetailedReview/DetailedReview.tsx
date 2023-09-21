import { useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../../../context/AuthContext';
import './DetailedReview.scss';
import ImagesDisplay from './ImagesDisplay';
import { Avatar, Button, Rating, Typography, useTheme } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { useSearchReviewCache } from '../../../hooks/useSearchReviewCache';
import CommentSection from './CommentSection/CommentSection';
import Feedback from './Feedback/Feedback';
import GradeIcon from '@mui/icons-material/Grade';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useTranslation } from 'react-i18next';
import { useIsLoading } from '../../../context/IsLoadingProvider';
import { useHandleIsLoading } from '../../../hooks/useHandleIsLoading';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import DownloadIcon from '@mui/icons-material/Download';
import StyledBox from './StyledBox';

interface Props {}

const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
};

const DetailedReview = (props: Props) => {
    const params = useParams();
    const { user, token } = useAuthContext();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { i18n, t } = useTranslation();
    const { setIsLoading } = useIsLoading();
    const theme = useTheme();

    const { review, isLoading, isError, isSuccess, isFetching } =
        useSearchReviewCache(params, queryClient, user);

    useHandleIsLoading(setIsLoading, isLoading, isSuccess, isError, isFetching);

    if (!review) return null;

    const handleDownloadPdf = async () => {
        try {
            const capture = document.querySelector('#review');
            if (!capture) return;
            html2canvas(capture as HTMLElement, {
                logging: true,
                allowTaint: false,
                useCORS: true,
                backgroundColor: theme.palette.background.default,
            }).then((canvas) => {
                const rect = capture.getBoundingClientRect();
                const componentWidth = rect.width;
                const componentHeight = rect.height;
                const aspectRatio = componentWidth / componentHeight;

                const imgData = canvas.toDataURL('img/png');
                const doc = new jsPDF({
                    orientation: aspectRatio > 1 ? 'landscape' : 'portrait',
                    unit: 'mm',
                    format: [componentWidth, componentHeight],
                });

                doc.addImage(
                    imgData,
                    'PNG',
                    0,
                    0,
                    componentWidth,
                    componentHeight
                );
                doc.save('review.pdf');
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='detailed-review'>
            <div className='flex-column gap-1'>
                <div id='review'>
                    <div className='flex-row justify-between items-center'>
                        <div className='flex-row items-center gap-1'>
                            <Avatar />
                            <Typography>{review.author.user_name}</Typography>
                        </div>
                        {review.editable && (
                            <Button
                                onClick={() => {
                                    if (review)
                                        navigate(
                                            `/account/${user?.id_user}/user-reviews/${review.review_id}/edit`
                                        );
                                }}
                                variant='outlined'
                            >
                                {t('detailed.edit')}
                            </Button>
                        )}
                    </div>
                    <div>
                        <Typography variant='caption'>
                            {new Date(review.create_date).toLocaleDateString(
                                i18n.language,
                                options
                            )}
                        </Typography>
                    </div>
                    <div className='flex-row items-center gap-1'>
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

                    <div className='flex-row items-center gap-1 pt-4'>
                        <GradeIcon color='primary' />
                        <Typography>{review.score}/10</Typography>
                        <Typography variant='h6'>{review.name}</Typography>
                        <div className='flex-row items-center gap-1 width-fit pl-2'>
                            <ThumbUpIcon
                                color='primary'
                                sx={{ fontSize: '1em' }}
                            />
                            <Typography variant='subtitle2'>
                                {review.likes.length}
                            </Typography>
                        </div>
                    </div>

                    <ImagesDisplay images={review.images} />
                    <StyledBox>
                        <ReactMarkdown
                            children={review.text}
                            className='markdown'
                        />
                    </StyledBox>
                </div>
                <CommentSection user={user} params={params} />
                <Feedback
                    user={user}
                    params={params}
                    token={token}
                    review={review}
                />
            </div>
            <Button
                variant='outlined'
                onClick={handleDownloadPdf}
                className='pb-10'
            >
                <DownloadIcon /> PDF
            </Button>
        </div>
    );
};

export default DetailedReview;
