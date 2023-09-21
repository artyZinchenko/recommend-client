import {
    Button,
    Dialog,
    DialogTitle,
    FormControlLabel,
    Switch,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { blockUser } from '../../services/admin.services/blockUser';
import { useAuthContext } from '../../context/AuthContext';
import { useQueryClient } from '@tanstack/react-query';
import CircularProgress from '@mui/material/CircularProgress';
import { grantAdmin } from '../../services/admin.services/grantAdmin';
import { useTranslation } from 'react-i18next';

interface Props {
    option: string;
    setOption: React.Dispatch<React.SetStateAction<string>>;
    handleClose: () => void;
    user: User | null;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmDialog = ({ option, user, open, setOpen, handleClose }: Props) => {
    const { token } = useAuthContext();
    const [dialogText, setDialogText] = useState('');
    const [switchText, setSwitchText] = useState('');
    const [checked, setChecked] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [message, setMessage] = useState('');
    const [progress, setProgress] = useState(false);
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    const handleCancel = () => {
        setOpen(false);
        handleClose();
    };

    const handleConfirm = async () => {
        setProgress(true);
        setDisabled(true);
        try {
            if (!user) throw new Error('Can not find user');
            if (option === 'block') {
                const response = await blockUser(user, token);
                setMessage(response.message);
            } else if (option === 'admin') {
                const response = await grantAdmin(user, token);
                setMessage(response.message);
            }

            queryClient.invalidateQueries(['admin']);
        } catch (err) {
            console.log('error', err);
            if (err instanceof Error) {
                setMessage(err.message);
            }
        } finally {
            setProgress(false);
            setDisabled(false);
        }
    };

    useEffect(() => {
        switch (option) {
            case 'block':
                setDialogText(`${t('admin.confirmBlock')} ${user?.user_name}`);
                setSwitchText(`${t('admin.block')}`);
                break;
            case 'admin':
                setDialogText(`${t('admin.confirmGrant')}  ${user?.user_name}`);
                setSwitchText(`${t('admin.grant')}`);
                break;
            default:
                setOpen(false);
                break;
        }
    }, [option]);

    return (
        <Dialog open={open}>
            {progress ? (
                <div className='flex-column justify-center items-center p-10 '>
                    <CircularProgress />
                </div>
            ) : (
                <>
                    {message?.length > 0 ? (
                        <div className='flex-column justify-center items-center p-10 gap-6'>
                            <Typography>{message}</Typography>
                            <Button
                                onClick={() => {
                                    setOpen(false);
                                    handleClose();
                                }}
                                variant='outlined'
                            >
                                {t('admin.ok')}
                            </Button>
                        </div>
                    ) : (
                        <>
                            <DialogTitle>{dialogText}</DialogTitle>
                            <div className='flex-column gap-5 items-center p-5'>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={checked}
                                            onChange={() => {
                                                setChecked(!checked);
                                                setDisabled(false);
                                            }}
                                        />
                                    }
                                    label={switchText}
                                />
                                <div className='flex-row justify-center gap-10'>
                                    <Button
                                        variant='contained'
                                        disabled={disabled}
                                        onClick={handleConfirm}
                                    >
                                        {t('admin.confirm')}
                                    </Button>
                                    <Button
                                        variant='outlined'
                                        onClick={handleCancel}
                                    >
                                        {t('admin.cancel')}
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}
        </Dialog>
    );
};

export default ConfirmDialog;
