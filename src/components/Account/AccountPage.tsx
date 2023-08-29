import { Route, Routes, useParams } from 'react-router-dom';
import { useAuthContext } from '../Registration/AuthContext';
import ReviewList from '../ReviewDisplay/ReviewList/ReviewList';
import DetailedReview from '../ReviewDisplay/DetailedReview/DetailedReview';
import { Typography } from '@mui/material';
import CreateReview from '../Review/ReviewForm';
import EditReview from './EditReview';
import UserReviews from './UserReviews';

interface Props {}
const AccountPage = (props: Props) => {
    const { userId } = useParams();

    return (
        <div>
            <Typography>Account Page</Typography>
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
