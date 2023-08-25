import * as Yup from 'yup';

export const validationSchema = Yup.object({
    name: Yup.string().required('Review name is required'),
    productTitle: Yup.string().required('Product title is required'),
    text: Yup.string().required('Review text is required'),
});
