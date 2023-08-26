import { useFormik } from 'formik';
import { validationSchema } from './validationSchema';
import {
    Container,
    Box,
    Typography,
    Grid,
    TextField,
    Button,
    TextareaAutosize,
} from '@mui/material';
import { useState } from 'react';
import { createReview } from '../../services/review.services';
import { useAuthContext } from '../Registration/AuthContext';
import { ProductType, productTypes } from '../../data/productTypes';
import SelectType from './components/SelectType';
import AddTags from './components/AddTags';
import { parseTags } from './utils/parseTags';
import { Textarea } from '@primer/react';
import ImageDropzone from './components/ImageDropzone';
import './Review.scss';
import { getLinks } from './utils/getLinks';
import Rating from './components/Rating';

interface Props {}

const CreateReview = (props: Props) => {
    const [disabled, setDisabled] = useState(false);
    const [notification, setNotification] = useState('');
    const [success, setSuccess] = useState(false);
    const [tagInput, setTagInput] = useState('');
    const { token } = useAuthContext();
    const [productType, setProductType] = useState<ProductType>(
        productTypes[0]
    );
    const [images, setImages] = useState<ImageFile[]>([]);
    const [rating, setRating] = useState(1);

    const formik = useFormik({
        initialValues: {
            name: '',
            productTitle: '',
            productType: 'Book',
            text: '',
            tags: [],
            images: [],
            rating: 1,
        },
        validationSchema,
        onSubmit: async (values: NewReview) => {
            if (!productType) return;
            setDisabled(true);
            try {
                const imageLinks = await getLinks(images);
                console.log(imageLinks);
                const response = await createReview(
                    {
                        name: values.name,
                        images: imageLinks,
                        productTitle: values.productTitle,
                        productType: productType.type,
                        text: values.text,
                        tags: parseTags(tagInput),
                        rating,
                    },
                    token
                );
                setSuccess(true);
                setNotification(response.message);
            } catch (err) {
                let message = 'Error';
                if (err instanceof Error) {
                    message = err.message;
                }
                setNotification(message);
            } finally {
                setDisabled(false);
            }
        },
    });

    return (
        <Container component='main' maxWidth='xs'>
            <Typography component='h1' variant='h5'>
                Create New Review
            </Typography>
            <Box
                component='form'
                noValidate
                onSubmit={formik.handleSubmit}
                sx={{ mt: 3 }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <SelectType
                            productType={productType}
                            setProductType={setProductType}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id='name'
                            label='Review Title'
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
                        <TextField
                            fullWidth
                            id='productTitle'
                            label='Product title'
                            {...formik.getFieldProps('productTitle')}
                            error={
                                formik.touched.productTitle &&
                                Boolean(formik.errors.productTitle)
                            }
                            helperText={
                                formik.touched.productTitle &&
                                formik.errors.productTitle
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Rating rating={rating} setRating={setRating} />
                    </Grid>
                    <Grid item xs={12}>
                        <ImageDropzone images={images} setImages={setImages} />
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
                            label='Text'
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
                    Post Review
                </Button>
            </Box>
        </Container>
    );
};

export default CreateReview;
