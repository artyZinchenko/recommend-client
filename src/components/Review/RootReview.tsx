import { Box, Button, LinearProgress, Typography } from '@mui/material';
import { useState } from 'react';
import ReviewForm from './ReviewForm';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

interface Props {
    review?: ReviewDB;
}
const RootReview = ({ review }: Props) => {
    const [notification, setNotification] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const { user } = useAuthContext();

    return (
        <div className='flex-column items-center'>
            {notification.length > 0 && (
                <div className='notification'>
                    <Typography>{notification}</Typography>
                    {success && (
                        <Button
                            variant='text'
                            onClick={() =>
                                navigate(
                                    `/account/${user?.id_user}/user-reviews`
                                )
                            }
                        >
                            To my reviews
                        </Button>
                    )}
                </div>
            )}

            {!success && (
                <ReviewForm
                    review={review}
                    setSuccess={setSuccess}
                    setNotification={setNotification}
                />
            )}
        </div>
    );
};
export default RootReview;
