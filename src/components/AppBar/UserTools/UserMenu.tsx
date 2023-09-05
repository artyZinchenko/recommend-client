import { Avatar, Menu, MenuItem, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../context/AuthContext';

interface Props {}
const UserMenu = (props: Props) => {
    const { user } = useAuthContext();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const { logOut } = useAuthContext();

    const open = Boolean(anchorEl);
    const handleClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className='flex-row items-center gap-3'>
            {user && <Typography>{user.user_name}</Typography>}
            <div onClick={handleClick}>
                <Avatar className='pointer' />
            </div>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                {user?.role === 'ADMIN' && (
                    <MenuItem onClick={() => navigate(`/admin-panel`)}>
                        Admin panel
                    </MenuItem>
                )}

                <MenuItem
                    onClick={() =>
                        navigate(`/account/${user?.id_user}/user-reviews`)
                    }
                >
                    My reviews
                </MenuItem>
                <MenuItem onClick={() => navigate('/reviews/create')}>
                    Create review
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        logOut();
                        handleClose();
                    }}
                >
                    Logout
                </MenuItem>
            </Menu>
        </div>
    );
};

export default UserMenu;
