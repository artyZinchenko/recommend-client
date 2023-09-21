import {
    IconButton,
    ListItemButton,
    ListItemText,
    Drawer as MuiDrawer,
    useTheme,
} from '@mui/material';
import List from '@mui/material/List';
import { useDrawerContext } from '../../context/DrawerContext';
import { useAuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import UserInfo from './components/UserInfo';
import Language from './components/Language';
import { useTranslation } from 'react-i18next';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useColorModeContext } from '../../context/ColorModeContext';
import './Drawer.scss';

const Drawer = () => {
    const { drawerOpen, setDrawerOpen } = useDrawerContext();
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const { logOut } = useAuthContext();
    const { t } = useTranslation();
    const theme = useTheme();
    const { toggleColorMode } = useColorModeContext();

    const handleToMyReviews = () => {
        navigate(`/account/${user?.id_user}/user-reviews`);
        setDrawerOpen(false);
    };
    const handleToCreateReview = () => {
        navigate('/create-review');
        setDrawerOpen(false);
    };

    return (
        <MuiDrawer
            anchor='right'
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
        >
            <List className='sidebar'>
                {user ? (
                    <UserInfo />
                ) : (
                    <ListItemButton
                        onClick={() => {
                            navigate('registration');
                            setDrawerOpen(false);
                        }}
                    >
                        <ListItemText>{t('registration.sign_in')}</ListItemText>
                    </ListItemButton>
                )}

                {user?.role === 'ADMIN' && (
                    <ListItemButton
                        onClick={() => {
                            navigate(`/admin-panel`);
                            setDrawerOpen(false);
                        }}
                    >
                        <ListItemText>{t('drawer.admin')}</ListItemText>
                    </ListItemButton>
                )}
                {user && (
                    <>
                        <ListItemButton onClick={handleToMyReviews}>
                            <ListItemText>
                                {t('drawer.my_reviews')}
                            </ListItemText>
                        </ListItemButton>

                        <ListItemButton onClick={handleToCreateReview}>
                            <ListItemText>
                                {t('drawer.create_review')}
                            </ListItemText>
                        </ListItemButton>

                        <ListItemButton
                            onClick={() => {
                                logOut();
                                setDrawerOpen(false);
                            }}
                        >
                            <ListItemText>{t('drawer.logout')}</ListItemText>
                        </ListItemButton>
                    </>
                )}
                <Language />
                <ListItemButton onClick={toggleColorMode}>
                    <ListItemText>
                        {t(`general.${theme.palette.mode}`)} {t('general.mode')}
                        <IconButton sx={{ ml: 1, padding: 0 }} color='inherit'>
                            {theme.palette.mode === 'dark' ? (
                                <Brightness7Icon />
                            ) : (
                                <Brightness4Icon
                                    sx={{
                                        color: 'rgba(0, 0, 0, 0.54)',
                                    }}
                                />
                            )}
                        </IconButton>
                    </ListItemText>
                </ListItemButton>
            </List>
        </MuiDrawer>
    );
};

export default Drawer;
