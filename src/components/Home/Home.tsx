import { Routes, Route } from 'react-router-dom';
import { useReviews } from '../../hooks/useReviews';
import DetailedReview from '../ReviewDisplay/DetailedReview/DetailedReview';
import ReviewList from '../ReviewDisplay/ReviewList/ReviewList';
import { useAuthContext } from '../Registration/AuthContext';

interface Props {}

const Home = (props: Props) => {
    const { user } = useAuthContext();
    const { isLoading, isError, data, error } = useReviews(user);

    if (isLoading) return <span>Loading...</span>;

    if (!data) return <span>Error</span>;

    return (
        <div>
            Home
            <Routes>
                <Route path='/' element={<ReviewList data={data} />} />
                <Route path='review/:reviewId' element={<DetailedReview />} />
            </Routes>
        </div>
    );
};

export default Home;
