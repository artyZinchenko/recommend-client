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
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

interface Props {}
const Registration = (props: Props) => {
    const { setUserData } = useAuthContext();

    const handleSignIn = async (
        provider: FacebookAuthProvider | TwitterAuthProvider
    ) => {
        try {
            const userObject = await signInWithPopup(auth, provider);

            // backend will verify token with firebase functions and match existing users with sign-in object or create new users
            // email is required for matching, though it's not provided by twitter auth during token verification (facebook provides email)
            // need to extract email from UserCredential of signInWithPopup and send to the server specifically for twitter case
            // this is an exception, and this solution should be temporary
            let emailForTwitter = null;
            if (provider instanceof TwitterAuthProvider) {
                emailForTwitter = userObject.user.providerData[0].email;
            }

            const token = await userObject.user.getIdToken();
            if (!token) return;
            const data = await signInFirebase(
                userObject.user.uid,
                token,
                emailForTwitter
            );
            setUserData(data);
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Paper variant='elevation' square className='flex justify-center '>
            <div className='flex-column p-4 justify-start items-center width-fit gap-3'>
                <Link to='/registration/sign-in'>
                    <Button variant='outlined'>Sign in</Button>
                </Link>
                <Button
                    onClick={() => handleSignIn(fbProvider)}
                    variant='outlined'
                >
                    <FacebookIcon />
                    <Typography sx={{ paddingInline: '0.3em' }}>
                        Sign in with Facebook
                    </Typography>
                </Button>
                <Button
                    onClick={() => handleSignIn(twProvider)}
                    variant='outlined'
                >
                    <TwitterIcon />
                    <Typography sx={{ paddingInline: '0.3em' }}>
                        Sign in with Twitter
                    </Typography>
                </Button>
                <div className='flex-row gap-2 items-center pt-2 pb-2'>
                    <hr className='horizontal-line' />
                    <Typography>or</Typography>
                    <hr className='horizontal-line' />
                </div>
                <Link to='/registration/create-account'>
                    <Button variant='contained'>Create a New Account</Button>
                </Link>
            </div>
        </Paper>
    );
};
export default Registration;
