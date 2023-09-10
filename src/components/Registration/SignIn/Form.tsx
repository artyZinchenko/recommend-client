import {
    Container,
    Box,
    Typography,
    Grid,
    TextField,
    Button,
} from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import Link from '../../custom/Link';
import { useAuthContext } from '../../../context/AuthContext';
import { login } from '../../../services/user.services/login';
import { useIsLoading } from '../../../context/IsLoadingProvider';

interface Props {
    setNotification: React.Dispatch<React.SetStateAction<string>>;
}

const Form = ({ setNotification }: Props) => {
    const [disabled, setDisabled] = useState(false);
    const { setUserData } = useAuthContext();
    const { setIsLoading } = useIsLoading();

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
                console.log(message);
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
                    Sign in
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
                                label='Email'
                                {...formik.getFieldProps('email')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                type='password'
                                id='password'
                                label='Password'
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
                        Sign in
                    </Button>
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Link to='/registration/create-account'>
                                New to Recommend? Create your account
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Form;
function signIn(values: SignInData) {
    throw new Error('Function not implemented.');
}
