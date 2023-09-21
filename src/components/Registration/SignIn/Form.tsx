import {
    Container,
    Box,
    Typography,
    Grid,
    TextField,
    Button,
    useTheme,
} from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import { login } from '../../../services/user.services/login';
import { useIsLoading } from '../../../context/IsLoadingProvider';
import { useTranslation } from 'react-i18next';
import { useNotificationContext } from '../../../context/NotificationContext';
import { Link } from 'react-router-dom';

const Form = () => {
    const { setNotification } = useNotificationContext();
    const [disabled, setDisabled] = useState(false);
    const { setUserData } = useAuthContext();
    const { setIsLoading } = useIsLoading();
    const { t } = useTranslation();
    const theme = useTheme();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async (values: SignInData) => {
            setDisabled(true);
            setIsLoading(true);
            try {
                const data = await login(values);
                setUserData(data);
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
                    {t('registration.sign_in_header')}
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
                                id='email'
                                label={t('general.email')}
                                {...formik.getFieldProps('email')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                type='password'
                                id='password'
                                label={t('general.password')}
                                {...formik.getFieldProps('password')}
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
                        {t('registration.sign_in')}
                    </Button>
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Link
                                to='/registration/create-account'
                                style={{ color: theme.palette.primary.main }}
                            >
                                {t('registration.sign_in_q')}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Form;
