import { useUserReviews } from '../../hooks/useUserReviews';
import { useAuthContext } from '../../context/AuthContext';
import { useHandleIsLoading } from '../../hooks/useHandleIsLoading';
import { useIsLoading } from '../../context/IsLoadingProvider';
import Table from '../Table/Table';
import { Box } from '@mui/material';

interface Props {
    requestedId: string | undefined;
}

const UserReviews = ({ requestedId }: Props) => {
    const { user, token } = useAuthContext();
    const { setIsLoading } = useIsLoading();

    const { isLoading, isError, data, isSuccess, isFetching } = useUserReviews(
        user,
        token,
        requestedId
    );

    useHandleIsLoading(setIsLoading, isLoading, isSuccess, isError, isFetching);

    return (
        <Box sx={{ overflow: 'auto', maxWidth: '100%' }}>
            <Table data={data} />
        </Box>
    );
};

export default UserReviews;
