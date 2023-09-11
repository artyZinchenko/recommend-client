import { useQuery } from '@tanstack/react-query';
import { getTotalLikes } from '../../../services/user.services/getTotalLikes';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { useAuthContext } from '../../../context/AuthContext';
import { Skeleton, Typography } from '@mui/material';

interface Props {}
const TotalLikes = (props: Props) => {
    const { user, token } = useAuthContext();

    const { data, isSuccess, isLoading, isError, error } = useQuery({
        queryKey: ['total_likes', user?.id_user],
        queryFn: async () => {
            const data = await getTotalLikes(token);
            return data.total_likes;
        },
    });

    if (isLoading) {
        return (
            <div className='flex-row items-center gap-1 width-fit pl-2'>
                <Skeleton variant='rectangular' width={16} height={16} />
                <Skeleton variant='rectangular' width={20} height={16} />
            </div>
        );
    }

    if (isError) {
        return null;
    }

    return (
        <div className='flex-row items-center gap-1 width-fit pl-2'>
            <ThumbUpOutlinedIcon color='primary' sx={{ fontSize: '1em' }} />
            <Typography variant='subtitle2'>{data}</Typography>
        </div>
    );
};
export default TotalLikes;
