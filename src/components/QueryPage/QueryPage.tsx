import { useSearchParams } from 'react-router-dom';
import { useReviewsQuery } from '../../hooks/useReviewsQuery';
import { useIsLoading } from '../../context/IsLoadingProvider';
import { useEffect } from 'react';
import { Typography } from '@mui/material';
import ReviewList from '../ReviewDisplay/ReviewList/ReviewList';
import { useAuthContext } from '../../context/AuthContext';
import { useHandleIsLoading } from '../../hooks/useHandleIsLoading';
import { useTranslation } from 'react-i18next';

const QueryPage = () => {
    let [searchParams] = useSearchParams();
    const { setIsLoading } = useIsLoading();
    const { user } = useAuthContext();
    const type = searchParams.get('t');
    const q = searchParams.get('q');
    const { t } = useTranslation();

    useEffect(() => {
        return () => setIsLoading(false);
    }, [setIsLoading]);

    const { isLoading, isError, isSuccess, data, error, isFetching } =
        useReviewsQuery(type, q, user);

    useHandleIsLoading(setIsLoading, isLoading, isSuccess, isError, isFetching);

    if (isError) {
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
        if (!data) return <Typography>Something went wrong</Typography>;
        if (data.length === 0)
            return <Typography>No reviews match your search...</Typography>;
    }

    return (
        <div className='flex-column items-center gap-2'>
            <Typography variant='h6'>
                {t('queryPage.searching')}: {q}
            </Typography>
            <ReviewList data={data} />
        </div>
    );
};

export default QueryPage;
