import {
    Avatar,
    ListItemButton,
    ListItemText,
    Drawer as MuiDrawer,
    Typography,
    styled,
} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useDrawerContext } from '../../context/DrawerContext';
import { useAuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import UserInfo from './components/UserInfo';
import Language from './components/Language';

const StyledMuiDrawer = styled(MuiDrawer)(({ theme }) => ({
    '& .css-1160xiw-MuiPaper-root-MuiDrawer-paper': {
        width: '15em',
    },
}));

const Drawer = () => {
    const { drawerOpen, setDrawerOpen } = useDrawerContext();
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const { logOut } = useAuthContext();

    const handleToMyReviews = () => {
        navigate(`/account/${user?.id_user}/user-reviews`);
        setDrawerOpen(false);
    };
    const handleToCreateReview = () => {
        navigate('/create-review');
        setDrawerOpen(false);
    };

    return (
        <StyledMuiDrawer
            anchor='right'
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
        >
            <List className='sidebar'>
                <UserInfo />

                {user?.role === 'ADMIN' && (
                    <ListItem onClick={() => navigate(`/admin-panel`)}>
                        Admin panel
                    </ListItem>
                )}
                <ListItemButton onClick={handleToMyReviews}>
                    <ListItemText>My reviews</ListItemText>
                </ListItemButton>
                <ListItemButton onClick={handleToCreateReview}>
                    <ListItemText>Create review</ListItemText>
                </ListItemButton>
                <ListItemButton
                    onClick={() => {
                        logOut();
                        setDrawerOpen(false);
                    }}
                >
                    <ListItemText>Logout</ListItemText>
                </ListItemButton>
                <Language />
            </List>
        </StyledMuiDrawer>
    );
};

export default Drawer;
