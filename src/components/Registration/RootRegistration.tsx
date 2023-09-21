import { Routes, Route } from 'react-router-dom';
import Registration from './Registration';
import RootCreateAcc from './CreateAccount/RootCreateAcc';
import RootSignIn from './SignIn/RootSignIn';
import './Registration.scss';
import { useNotificationContext } from '../../context/NotificationContext';
import { useRemoveNotification } from '../../hooks/useRemoveNotification';

const RootRegistration = () => {
    const { setNotification } = useNotificationContext();
    useRemoveNotification(
        setNotification as React.Dispatch<
            React.SetStateAction<Notification | null>
        >
    );

    return (
        <div className='flex-column items-center'>
            <Routes>
                <Route path='/' element={<Registration />} />
                <Route path='create-account' element={<RootCreateAcc />} />
                <Route path='sign-in' element={<RootSignIn />} />
            </Routes>
        </div>
    );
};
export default RootRegistration;
