import { MenuItem } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from './ConfirmDialog';
import { useTranslation } from 'react-i18next';

interface Props {
    handleClose: () => void;
    user: User | null;
}

const AdminActions = ({ handleClose, user }: Props) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [option, setOption] = useState('');
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleManage = () => {
        navigate(`/account/${user?.id_user}/user-reviews`);
        handleClose();
    };

    const handleBlock = () => {
        setOption('block');
        setDialogOpen(true);
    };
    const handleGrant = () => {
        setOption('admin');
        setDialogOpen(true);
    };

    return (
        <>
            <div style={{ minWidth: '15em' }}>
                <MenuItem onClick={handleManage}>{t('admin.manage')}</MenuItem>
                <MenuItem onClick={handleBlock}>{t('admin.block')}</MenuItem>
                <MenuItem onClick={handleGrant}>{t('admin.grant')}</MenuItem>
            </div>
            <ConfirmDialog
                user={user}
                option={option}
                setOption={setOption}
                handleClose={handleClose}
                open={dialogOpen}
                setOpen={setDialogOpen}
            />
        </>
    );
};
export default AdminActions;
