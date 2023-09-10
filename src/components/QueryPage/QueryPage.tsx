import { useParams, useSearchParams } from 'react-router-dom';
import { useReviewsQuery } from '../../hooks/useReviewsQuery';
import { useIsLoading } from '../../context/IsLoadingProvider';
import { useEffect } from 'react';
import { Typography } from '@mui/material';
import ReviewList from '../ReviewDisplay/ReviewList/ReviewList';
import { useAuthContext } from '../../context/AuthContext';

interface Props {}

const QueryPage = (props: Props) => {
    let [searchParams] = useSearchParams();
    const { setIsLoading } = useIsLoading();
    const { user } = useAuthContext();
    const t = searchParams.get('t');
    const q = searchParams.get('q');

    useEffect(() => {
        return () => setIsLoading(false);
    }, []);

    const { isLoading, isError, isSuccess, data, error } = useReviewsQuery(
        t,
        q,
        user
    );

    if (isLoading) {
        setIsLoading(true);
    }

    if (isError) {
        setIsLoading(false);
        return (
            <div>
                <Typography>Something went wrong</Typography>
                {error instanceof Error && (
                    <Typography>{error.message}</Typography>
                )}
            </div>
        );
    }

    if (isSuccess) {
        setIsLoading(false);
        if (!data) return <Typography>Something went wrong</Typography>;
        if (data.length === 0)
            return <Typography>No reviews match your search...</Typography>;
        return (
            <div className='flex-column items-center gap-2'>
                <Typography variant='h6'>Searching: {q}</Typography>
                <ReviewList data={data} />
            </div>
        );
    }

    return null;
};

export default QueryPage;
