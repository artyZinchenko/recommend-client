import { Button, Dialog, Typography } from '@mui/material';
import { useAuthContext } from '../../../context/AuthContext';
import { deleteReview } from '../../../services/review.services/deleteReview';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    reviewId: string | undefined;
    user: User | null;
}

const DeleteDialog = ({ open, setOpen, reviewId, user }: Props) => {
    const { token } = useAuthContext();
    const [message, setMessage] = useState('');
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();
    const { t } = useTranslation();

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
                    <Typography>{t(`${message}`)}</Typography>
                    <Button
                        variant='outlined'
                        onClick={() => {
                            setOpen(false);
                            navigate(`/account/${user?.id_user}/user-reviews`);
                        }}
                    >
                        {t('admin.ok')}
                    </Button>
                </div>
            ) : (
                <div className='flex-column justify-center items-center p-10 gap-6'>
                    <Typography>{t('admin.confirmDelete')}</Typography>
                    <div className='flex-row justify-center gap-10'>
                        <Button
                            variant='contained'
                            onClick={handleConfirm}
                            disabled={disabled}
                        >
                            {t('admin.confirm')}
                        </Button>
                        <Button
                            variant='outlined'
                            onClick={() => setOpen(false)}
                        >
                            {t('admin.cancel')}
                        </Button>
                    </div>
                </div>
            )}
        </Dialog>
    );
};
export default DeleteDialog;
