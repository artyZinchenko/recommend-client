import * as Yup from 'yup';
import i18n from '../../i18n';

export const validationSchema = Yup.object({
    name: Yup.string().required(i18n.t('yup.name')),
    email: Yup.string()
        .email(i18n.t('yup.email.format'))
        .required(i18n.t('yup.email.req')),
    password: Yup.string()
        .min(8, i18n.t('yup.password.min'))
        .required(i18n.t('yup.password.req')),
    confirmPassword: Yup.string()
        .oneOf(
            [Yup.ref('password'), undefined],
            i18n.t('yup.confirmPassword.oneOf')
        )
        .required(i18n.t('yup.confirmPassword.req')),
});
