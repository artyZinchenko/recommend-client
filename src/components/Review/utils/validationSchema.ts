import * as Yup from 'yup';
import i18n from '../../../i18n';

export const validationSchema = Yup.object({
    name: Yup.string().required(i18n.t('yup.review_name')),
    text: Yup.string().required(i18n.t('yup.review_text')),
});
