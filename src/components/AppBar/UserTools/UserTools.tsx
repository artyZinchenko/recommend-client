import { Avatar, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../context/AuthContext';
import MenuIcon from '@mui/icons-material/Menu';
import { useDrawerContext } from '../../../context/DrawerContext';
import { useTranslation } from 'react-i18next';

const UserTools = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { setDrawerOpen } = useDrawerContext();
    const { t } = useTranslation();

    return (
        <div>
            {user ? (
                <div className='flex-row gap-3 pt-1'>
                    {user && <Typography>{user.user_name}</Typography>}
                    <div onClick={() => setDrawerOpen(true)}>
                        <MenuIcon className='pointer' />
                    </div>
                </div>
            ) : (
                <div className='flex-row items-center gap-3 pt-1'>
                    <Button
                        color='inherit'
                        onClick={() => navigate('registration')}
                    >
                        {t('registration.sign_in')}
                    </Button>
                    <div onClick={() => setDrawerOpen(true)} className='pt-1'>
                        <MenuIcon className='pointer' />
                    </div>
                </div>
            )}
        </div>
    );
};
export default UserTools;
