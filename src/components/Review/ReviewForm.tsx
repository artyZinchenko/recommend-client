import { useFormik } from 'formik';
import { validationSchema } from './utils/validationSchema';
import {
    Container,
    Box,
    Typography,
    Grid,
    TextField,
    Button,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { useState } from 'react';
import { createReview } from '../../services/review.services/createReview';
import { useAuthContext } from '../../context/AuthContext';
import AddTags from './components/AddTags';
import { parseTags } from './utils/parseTags';
import ImageDropzone from './components/ImageDropzone';
import { getLinks } from './utils/getLinks';
import Score from './components/Score';
import { updateReview } from '../../services/review.services/updateReview';
import './Review.scss';
import { tagsToString } from './utils/tagsToString';
import DeleteDialog from './components/DeleteDialog';
import { useIsLoading } from '../../context/IsLoadingProvider';
import { useTranslation } from 'react-i18next';
import SelectProduct from './components/SelectProduct';
import { useNotificationContext } from '../../context/NotificationContext';
import { useNavigate } from 'react-router-dom';

interface Props {
    review?: ReviewDB;
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ProductToDB {
    product_id?: number;
    product_name: string;
    type: string;
}

const ReviewForm = ({ review, setSuccess }: Props) => {
    const { setIsLoading } = useIsLoading();
    const { setNotification } = useNotificationContext();
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(false);
    const [tagInput, setTagInput] = useState(
        review ? tagsToString(review.tags) : ''
    );
    const { token, user } = useAuthContext();
    const [product, setProduct] = useState<ProductToDB>(
        review?.product
            ? {
                  product_name: review.product.product_name,
                  type: review.product.type,
              }
            : {
                  product_name: '',
                  type: 'Book',
              }
    );
    const [images, setImages] = useState<ImageFile[]>([]);
    const [imagesEdit, setImagesEdit] = useState<string[]>(
        review?.images ? [...review.images] : []
    );
    const [score, setScore] = useState(review?.score || 1);
    const [dialogOpen, setDialogOpen] = useState(false);
    const { t } = useTranslation();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

    const formik = useFormik({
        initialValues: {
            name: review?.name || '',
            product: product,
            text: review?.text || '',
            tags: [],
            images: [],
            score: review?.score || 1,
        },
        validationSchema,
        onSubmit: async (values: NewReview) => {
            setIsLoading(true);
            setDisabled(true);
            try {
                const imageLinks = await getLinks(images);

                if (review) {
                    await updateReview(
                        {
                            authorId: review.authorId,
                            review_id: review.review_id,
                            name: values.name,
                            images: [...imageLinks, ...imagesEdit],
                            text: values.text,
                            tags: parseTags(tagInput),
                            score,
                        },
                        token
                    );
                    setSuccess(true);
                    setNotification({
                        type: 'success',
                        message: 'notification.review.created',
                        action: {
                            name: 'notification.review.to_reviews',
                            handler: () =>
                                navigate(
                                    `/account/${user?.id_user}/user-reviews`
                                ),
                        },
                    });
                } else {
                    await createReview(
                        {
                            name: values.name,
                            images: imageLinks,
                            product: product,
                            text: values.text,
                            tags: parseTags(tagInput),
                            score,
                        },
                        token
                    );
                    setSuccess(true);
                    setNotification({
                        type: 'success',
                        message: 'notification.review.created',
                        action: {
                            name: 'notification.review.to_reviews',
                            handler: () =>
                                navigate(
                                    `/account/${user?.id_user}/user-reviews`
                                ),
                        },
                    });
                }
            } catch (err) {
                let message = 'Error';
                if (err instanceof Error) {
                    message = err.message;
                }
                setNotification({
                    type: 'error',
                    message: message,
                });
            } finally {
                setIsLoading(false);
                setDisabled(false);
            }
        },
    });

    return (
        <Container component='main' maxWidth={matches ? 'xs' : 'md'}>
            <Typography component='h1' variant='h5'>
                {review ? `${t('create.edit')}` : `${t('create.create')}`}
            </Typography>
            <Box
                component='form'
                noValidate
                onSubmit={formik.handleSubmit}
                sx={{ mt: 3 }}
            >
                <Grid container spacing={2}>
                    {!review && (
                        <SelectProduct
                            setProduct={setProduct}
                            product={product}
                        />
                    )}

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id='name'
                            label={t('create.title')}
                            {...formik.getFieldProps('name')}
                            error={
                                formik.touched.name &&
                                Boolean(formik.errors.name)
                            }
                            helperText={
                                formik.touched.name && formik.errors.name
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Score score={score} setScore={setScore} />
                    </Grid>
                    <Grid item xs={12}>
                        <ImageDropzone
                            images={images}
                            setImages={setImages}
                            imagesEdit={imagesEdit}
                            setImagesEdit={setImagesEdit}
                            reviewImages={review?.images}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <AddTags
                            tagInput={tagInput}
                            setTagInput={setTagInput}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            multiline
                            minRows={6}
                            label={t('general.text')}
                            type='text'
                            id='text'
                            {...formik.getFieldProps('text')}
                            error={
                                formik.touched.text &&
                                Boolean(formik.errors.text)
                            }
                            helperText={
                                formik.touched.text && formik.errors.text
                            }
                        />
                    </Grid>
                </Grid>
                <Button
                    type='submit'
                    fullWidth
                    disabled={disabled}
                    variant='contained'
                    sx={{ mt: 3, mb: 2 }}
                >
                    {review
                        ? `${t('create.postEdited')}`
                        : `${t('create.post')}`}
                </Button>
                {review && (
                    <Button
                        fullWidth
                        onClick={() => setDialogOpen(true)}
                        color='warning'
                        variant='contained'
                        sx={{ mb: 2 }}
                    >
                        {t('create.deleteReview')}
                    </Button>
                )}
            </Box>
            <DeleteDialog
                open={dialogOpen}
                setOpen={setDialogOpen}
                reviewId={review?.review_id}
                user={user}
            />
        </Container>
    );
};

export default ReviewForm;
