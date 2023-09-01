import { Params, useNavigate } from 'react-router-dom';
import Like from './Like';
import Rate from './Rate';
import { Typography, Button } from '@mui/material';

interface Props {
    user: User | null;
    params: Params;
    token: string;
    review: ReviewDB;
}

const Feedback = ({ user, params, token, review }: Props) => {
    const navigate = useNavigate();

    const toSignIn = () => {
        navigate('/registration/sign-in');
    };

    return (
        <div className='flex-colums pb-10'>
            <hr className='horizontal-line pt-2' />
            {user ? (
                <div className='flex-row justify-between'>
                    <Like
                        user={user}
                        params={params}
                        token={token}
                        likes={review.likes}
                    />
                    <Rate
                        user={user}
                        params={params}
                        token={token}
                        review={review}
                    />
                </div>
            ) : (
                <div className='flex-row justify-start items-baseline gap-3'>
                    <Typography variant='subtitle2'>
                        Please sign in to like or comment
                    </Typography>
                    <Button variant='text' onClick={toSignIn} size='small'>
                        Sign in
                    </Button>
                </div>
            )}
        </div>
    );
};
export default Feedback;
