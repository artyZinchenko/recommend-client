import { Avatar, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../Registration/AuthContext';

interface Props {}
const UserMenu = (props: Props) => {
    const { user } = useAuthContext();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();

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
        <div>
            <div id='basic-button' onClick={handleClick}>
                <Avatar className='pointer' />
            </div>
            <Menu
                id='basic-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
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
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </div>
    );
};

export default UserMenu;
