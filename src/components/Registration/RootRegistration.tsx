import { Routes, Route, useParams } from 'react-router-dom';
import Registration from './Registration';
import RootCreateAcc from './CreateAccount/RootCreateAcc';
import RootSignIn from './SignIn/RootSignIn';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import './Registration.scss';

interface Props {}
const RootRegistration = (props: Props) => {
    const [notification, setNotification] = useState('');
    const params = useParams();

    useEffect(() => {
        setNotification('');
    }, [params]);

    return (
        <div className='flex-column items-center'>
            {notification.length > 0 && (
                <div className='notification'>
                    <Typography>{notification}</Typography>
                </div>
            )}
            <Routes>
                <Route
                    path='/'
                    element={<Registration setNotification={setNotification} />}
                />
                <Route
                    path='create-account'
                    element={
                        <RootCreateAcc setNotification={setNotification} />
                    }
                />
                <Route
                    path='sign-in'
                    element={<RootSignIn setNotification={setNotification} />}
                />
            </Routes>
        </div>
    );
};
export default RootRegistration;
