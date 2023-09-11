import { ListItem, Typography } from '@mui/material';
import { Avatar, ListItemText } from '@mui/material';
import { useAuthContext } from '../../../context/AuthContext';
import TotalLikes from './TotalLikes';

interface Props {}
const UserInfo = (props: Props) => {
    const { user } = useAuthContext();

    return (
        <ListItem className='gap-1'>
            {/* <div className='flex-column gap-1'>
                <div className='flex-row gap-1'> */}
            <Avatar />
            <ListItemText>{user?.user_name}</ListItemText>

            <TotalLikes />
            {/* </div> */}
        </ListItem>
    );
};

export default UserInfo;
