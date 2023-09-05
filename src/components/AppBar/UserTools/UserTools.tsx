import { Avatar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../context/AuthContext';
import UserMenu from './UserMenu';

interface Props {}
const UserTools = (props: Props) => {
    const navigate = useNavigate();
    const { user } = useAuthContext();

    return (
        <div>
            {user ? (
                <UserMenu />
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
