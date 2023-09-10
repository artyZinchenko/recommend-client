import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { validationSchema } from '../validationSchema';
import { useFormik } from 'formik';
import { useState } from 'react';
import Link from '../../custom/Link';
import { createAccount } from '../../../services/user.services/createAccount';
import { useIsLoading } from '../../../context/IsLoadingProvider';

interface Props {
    setNotification: React.Dispatch<React.SetStateAction<string>>;
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const Form = ({ setNotification, setSuccess }: Props) => {
    const [disabled, setDisabled] = useState(false);
    const { setIsLoading } = useIsLoading();

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
                const response = await createAccount({
                    name: values.name,
                    email: values.email,
                    password: values.password,
                });
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
                    Create Account
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
                                // name='name'
                                required
                                fullWidth
                                id='name'
                                label='Name'
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
                                label='Email Address'
                                {...formik.getFieldProps('email')}
                                error={
                                    formik.touched.email &&
                                    Boolean(formik.errors.email)
                                }
                                helperText={
                                    formik.touched.email && formik.errors.email
                                }
                                // name='email'
                                // autoComplete='email'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                // name='password'
                                label='Password'
                                type='password'
                                id='password'
                                // autoComplete='new-password'
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
                                // name='password'
                                label='Confirm password'
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
                        Create Account
                    </Button>
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Link to='/registration/sign-in'>
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Form;
