import { Button, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import {
    signInWithPopup,
    FacebookAuthProvider,
    TwitterAuthProvider,
} from 'firebase/auth';
import { auth, fbProvider, twProvider } from '../../firebase-config';
import { signInFirebase } from '../../services/user.services/signInFirebase';
import { useAuthContext } from '../../context/AuthContext';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useIsLoading } from '../../context/IsLoadingProvider';

interface Props {
    setNotification: React.Dispatch<React.SetStateAction<string>>;
}

const Registration = ({ setNotification }: Props) => {
    const { setUserData } = useAuthContext();
    const { setIsLoading } = useIsLoading();

    const firebaseSignIn = async (
        provider: FacebookAuthProvider | TwitterAuthProvider
    ) => {
        setIsLoading(true);
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
        } catch (err) {
            let message = 'Error';
            if (err instanceof Error) {
                message = err.message;
            }
            setNotification(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Paper variant='elevation' square className='flex justify-center '>
            <div className='flex-column p-4 justify-start items-center width-fit gap-3'>
                <Link to='/registration/sign-in'>
                    <Button variant='outlined'>Sign in</Button>
                </Link>
                <Button
                    onClick={() => firebaseSignIn(fbProvider)}
                    variant='outlined'
                >
                    <FacebookIcon />
                    <Typography sx={{ paddingInline: '0.3em' }}>
                        Sign in with Facebook
                    </Typography>
                </Button>
                <Button
                    onClick={() => firebaseSignIn(twProvider)}
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
