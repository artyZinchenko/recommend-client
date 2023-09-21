import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { validationSchema } from '../validationSchema';
import { useFormik } from 'formik';
import { useState } from 'react';
import { createAccount } from '../../../services/user.services/createAccount';
import { useIsLoading } from '../../../context/IsLoadingProvider';
import { useTranslation } from 'react-i18next';
import { useNotificationContext } from '../../../context/NotificationContext';
import { useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

interface Props {
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const Form = ({ setSuccess }: Props) => {
    const { setNotification } = useNotificationContext();
    const [disabled, setDisabled] = useState(false);
    const { setIsLoading } = useIsLoading();
    const { t } = useTranslation();
    const theme = useTheme();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema,
        onSubmit: async (values: RegistrationData) => {
            setDisabled(true);
            setIsLoading(true);
            try {
                await createAccount({
                    name: values.name,
                    email: values.email,
                    password: values.password,
                });
                setSuccess(true);
                setNotification({
                    type: 'success',
                    message: 'registration.accout_created',
                });
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
                setDisabled(false);
                setIsLoading(false);
            }
        },
    });

    return (
        <Container component='main' maxWidth='xs'>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component='h1' variant='h5'>
                    {t('registration.create_acc_header')}
                </Typography>
                <Box
                    component='form'
                    noValidate
                    onSubmit={formik.handleSubmit}
                    sx={{ mt: 3 }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id='name'
                                label={t('general.name')}
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
                                required
                                fullWidth
                                id='email'
                                label={t('general.email')}
                                {...formik.getFieldProps('email')}
                                error={
                                    formik.touched.email &&
                                    Boolean(formik.errors.email)
                                }
                                helperText={
                                    formik.touched.email && formik.errors.email
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label={t('general.password')}
                                type='password'
                                id='password'
                                {...formik.getFieldProps('password')}
                                error={
                                    formik.touched.password &&
                                    Boolean(formik.errors.password)
                                }
                                helperText={
                                    formik.touched.password &&
                                    formik.errors.password
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label={t('general.confirmPassword')}
                                type='password'
                                id='confirmPassword'
                                autoComplete='new-password'
                                {...formik.getFieldProps('confirmPassword')}
                                error={
                                    formik.touched.confirmPassword &&
                                    Boolean(formik.errors.confirmPassword)
                                }
                                helperText={
                                    formik.touched.confirmPassword &&
                                    formik.errors.confirmPassword
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
                        {t('registration.create_acc_button')}
                    </Button>
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Link
                                to='/registration/sign-in'
                                style={{ color: theme.palette.primary.main }}
                            >
                                {t('registration.create_acc_q')}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Form;
