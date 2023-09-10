import { Routes, Route } from 'react-router-dom';
import DetailedReview from '../ReviewDisplay/DetailedReview/DetailedReview';
import ReviewList from '../ReviewDisplay/ReviewList/ReviewList';
import Home from './Home';

interface Props {}

const HomeRoot = (props: Props) => {
    return (
        <div>
            <Home />
        </div>
    );
};
export default HomeRoot;
