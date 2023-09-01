import { Button, Paper, Typography } from '@mui/material';
import {
    Link,
    Route,
    Routes,
    useLocation,
    useNavigate,
} from 'react-router-dom';
import CreateAccount from './CreateAccount/Form';
import { useEffect, useState } from 'react';

interface Props {}
const Registration = (props: Props) => {
    return (
        <Paper variant='elevation' square className='flex justify-center'>
            <div className='flex-column p-4 justify-start items-center width-fit'>
                <Link to='/registration/sign-in'>
                    <Button>Sign in</Button>
                </Link>
                <Button>Sign in with Facebook</Button>
                <Button>Sign in with Twitter</Button>
                <div className='flex-row gap-2 items-center pt-2 pb-2'>
                    <hr className='horizontal-line' />
                    <Typography>or</Typography>
                    <hr className='horizontal-line' />
                </div>
                <Link to='/registration/create-account'>
                    <Button>Create a New Account</Button>
                </Link>
            </div>
        </Paper>
    );
};
export default Registration;
