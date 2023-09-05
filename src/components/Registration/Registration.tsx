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
import {
    getAuth,
    signInWithPopup,
    FacebookAuthProvider,
    getRedirectResult,
    signInWithRedirect,
    TwitterAuthProvider,
} from 'firebase/auth';
import { auth, fbProvider, twProvider } from '../../firebase-config';
import { signInFirebase } from '../../services/user.services/signInFirebase';
import { useAuthContext } from '../../context/AuthContext';

interface Props {}
const Registration = (props: Props) => {
    const { setUserData } = useAuthContext();

    const handleSignIn = async (
        provider: FacebookAuthProvider | TwitterAuthProvider
    ) => {
        try {
            const userObject = await signInWithPopup(auth, provider);
            const token = await userObject.user.getIdToken();
            if (!token) return;
            const data = await signInFirebase(userObject.user.uid, token);
            setUserData(data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Paper variant='elevation' square className='flex justify-center'>
            <div className='flex-column p-4 justify-start items-center width-fit'>
                <Link to='/registration/sign-in'>
                    <Button>Sign in</Button>
                </Link>
                <Button onClick={() => handleSignIn(fbProvider)}>
                    Sign in with Facebook
                </Button>
                <Button onClick={() => handleSignIn(twProvider)}>
                    Sign in with Twitter
                </Button>
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
