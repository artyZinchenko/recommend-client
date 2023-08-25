import { Button, Typography } from '@mui/material';
import SignIn from './Form';
import { useState } from 'react';

interface Props {}
const RootSignIn = (props: Props) => {
    const [notification, setNotification] = useState('');
    const [success, setSuccess] = useState(false);
    //  const navigate = useNavigate();

    return (
        <div className='flex-column justify-center items-center'>
            {notification && <Typography>{notification}</Typography>}
            {success ? (
                <div className='flex-column items-center align-center pt-2'>
                    <Button>To my profile</Button>
                </div>
            ) : (
                <SignIn
                    setSuccess={setSuccess}
                    setNotification={setNotification}
                />
            )}
        </div>
    );
};
export default RootSignIn;
