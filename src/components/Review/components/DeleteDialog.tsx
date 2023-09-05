import { Button, Dialog, Typography } from '@mui/material';
import { useAuthContext } from '../../../context/AuthContext';
import { deleteReview } from '../../../services/review.services/deleteReview';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    reviewId: string | undefined;
}

const DeleteDialog = ({ open, setOpen, reviewId }: Props) => {
    const { token } = useAuthContext();
    const [message, setMessage] = useState('');
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setMessage('');
    }, [open]);

    const handleConfirm = async () => {
        setDisabled(true);
        try {
            const response = await deleteReview(reviewId, token);
            setMessage(response.message);
        } catch (err) {
            console.log('error', err);
            if (err instanceof Error) {
                setMessage(err.message);
            }
        } finally {
            setDisabled(false);
        }
    };

    return (
        <Dialog open={open}>
            {message.length > 0 ? (
                <div className='flex-column justify-center items-center p-10 gap-6'>
                    <Typography>{message}</Typography>
                    <Button
                        variant='outlined'
                        onClick={() => {
                            setOpen(false);
                            navigate('/home');
                        }}
                    >
                        Ok
                    </Button>
                </div>
            ) : (
                <div className='flex-column justify-center items-center p-10 gap-6'>
                    <Typography>Confirm delete review</Typography>
                    <div className='flex-row justify-center gap-10'>
                        <Button
                            variant='contained'
                            onClick={handleConfirm}
                            disabled={disabled}
                        >
                            Confirm
                        </Button>
                        <Button
                            variant='outlined'
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            )}
        </Dialog>
    );
};
export default DeleteDialog;
