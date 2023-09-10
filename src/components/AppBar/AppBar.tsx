import {
    LinearProgress,
    AppBar as MuiAppBar,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation, useNavigate } from 'react-router-dom';
import UserTools from './UserTools/UserTools';
import { useIsLoading } from '../../context/IsLoadingProvider';
import Search from './Search/Search';

const AppBar = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    const location = useLocation();
    const { isLoading } = useIsLoading();
    const navigateHome = () => {
        if (location.pathname === '/home') {
            return;
        }
        navigate('/home', { replace: true });
    };

    if (matches) {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <MuiAppBar position='static'>
                    <Toolbar className='flex-column items-center p-1 gap-1'>
                        <div className='flex-row justify-between items-center'>
                            <Typography
                                variant='h6'
                                component='div'
                                onClick={navigateHome}
                                className='pointer width-fit'
                            >
                                Recommend
                            </Typography>
                            <UserTools />
                        </div>
                        <Search />
                    </Toolbar>
                </MuiAppBar>
                <Box
                    sx={{
                        width: '100%',
                        minHeight: '0.3em',
                    }}
                >
                    {isLoading && <LinearProgress />}
                </Box>
            </Box>
        );
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <MuiAppBar position='static'>
                <Toolbar className='flex-row justify-between items-center'>
                    <Typography
                        variant='h6'
                        component='div'
                        onClick={navigateHome}
                        className='pointer width-fit'
                    >
                        Recommend
                    </Typography>
                    <Search />
                    <UserTools />
                </Toolbar>
            </MuiAppBar>
            <Box
                sx={{
                    width: '100%',
                    minHeight: '0.3em',
                }}
            >
                {isLoading && <LinearProgress />}
            </Box>
        </Box>
    );
};

export default AppBar;
