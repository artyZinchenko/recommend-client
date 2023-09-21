import { useState } from 'react';
import ReviewForm from './ReviewForm';
import { useRemoveNotification } from '../../hooks/useRemoveNotification';
import { useNotificationContext } from '../../context/NotificationContext';

interface Props {
    review?: ReviewDB;
}
const RootReview = ({ review }: Props) => {
    const [success, setSuccess] = useState(false);
    const { setNotification } = useNotificationContext();

    useRemoveNotification(
        setNotification as React.Dispatch<
            React.SetStateAction<Notification | null>
        >
    );

    return (
        <div className='flex-column items-center'>
            {!success && <ReviewForm review={review} setSuccess={setSuccess} />}
        </div>
    );
};

export default RootReview;
