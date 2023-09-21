import { Route, Routes, useParams } from 'react-router-dom';
import DetailedReview from '../ReviewDisplay/DetailedReview/DetailedReview';
import EditReview from './EditReview';
import UserReviews from './UserReviews';
import './Account.scss';

const AccountPage = () => {
    const { userId } = useParams();

    return (
        <>
            <Routes>
                <Route
                    path='user-reviews'
                    element={<UserReviews requestedId={userId} />}
                />
                <Route
                    path='user-reviews/:reviewId'
                    element={
                        <div className='account-reviews-container'>
                            <DetailedReview />
                        </div>
                    }
                />
                <Route
                    path='user-reviews/:reviewId/edit'
                    element={
                        <div className='account-reviews-container'>
                            <EditReview />
                        </div>
                    }
                />
            </Routes>
        </>
    );
};
export default AccountPage;
