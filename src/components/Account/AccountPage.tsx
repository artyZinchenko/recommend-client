import { Route, Routes, useParams } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import ReviewList from '../ReviewDisplay/ReviewList/ReviewList';
import DetailedReview from '../ReviewDisplay/DetailedReview/DetailedReview';
import { Paper, Typography } from '@mui/material';
import CreateReview from '../Review/ReviewForm';
import EditReview from './EditReview';
import UserReviews from './UserReviews';
import './Account.scss';

interface Props {}
const AccountPage = (props: Props) => {
    const { userId } = useParams();

    return (
        <div className='account-reviews-container'>
            <Routes>
                <Route
                    path='user-reviews'
                    element={<UserReviews requestedId={userId} />}
                />
                <Route
                    path='user-review/:reviewId'
                    element={<DetailedReview />}
                />
                <Route
                    path='user-review/:reviewId/edit'
                    element={<EditReview />}
                />
            </Routes>
        </div>
    );
};
export default AccountPage;
