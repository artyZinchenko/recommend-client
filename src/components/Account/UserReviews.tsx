import { useUserReviews } from '../../hooks/useUserReviews';
import { useAuthContext } from '../../context/AuthContext';
import ReviewList from '../ReviewDisplay/ReviewList/ReviewList';

interface Props {
    requestedId: string | undefined;
}

const UserReviews = ({ requestedId }: Props) => {
    const { user, token } = useAuthContext();

    const { isLoading, isError, data, error } = useUserReviews(
        user,
        token,
        requestedId
    );

    if (isLoading) {
        return <span>Loading...</span>;
    }

    if (!data) {
        return <span>Error</span>;
    }

    return <ReviewList data={data} />;
};

export default UserReviews;
