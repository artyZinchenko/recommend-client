import { DialogTitle, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from './ConfirmDialog';

interface Props {
    handleClose: () => void;
    user: User | null;
}

const AdminActions = ({ handleClose, user }: Props) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [option, setOption] = useState('');
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
                <MenuItem onClick={handleManage}>Manage reviews</MenuItem>
                <MenuItem onClick={handleBlock}>Block user</MenuItem>
                <MenuItem onClick={handleGrant}>Grant admin rights</MenuItem>
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
