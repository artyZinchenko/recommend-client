import { Skeleton } from '@mui/material';
import './Skeleton.scss';

const SkeletonReviewSummary = () => {
    const arr = Array.from({ length: 5 }, (_, i) => {
        return (
            <Skeleton
                animation='wave'
                variant='rounded'
                key={i}
                height={150}
                sx={{ maxWidth: '100%' }}
            />
        );
    });
    return <div className='reviews-list'>{arr}</div>;
};
export default SkeletonReviewSummary;
