import { Avatar, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../context/AuthContext';
import MenuIcon from '@mui/icons-material/Menu';
import { useDrawerContext } from '../../../context/DrawerContext';

interface Props {}
const UserTools = (props: Props) => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { setDrawerOpen } = useDrawerContext();

    return (
        <div>
            {user ? (
                <div className='flex-row items-center gap-3'>
                    {user && <Typography>{user.user_name}</Typography>}
                    <div onClick={() => setDrawerOpen(true)}>
                        <MenuIcon className='pointer' />
                    </div>
                </div>
            ) : (
                <Button
                    color='inherit'
                    onClick={() => navigate('registration')}
                >
                    Sign in
                </Button>
            )}
        </div>
    );
};
export default UserTools;
