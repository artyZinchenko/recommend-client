import { Params, useNavigate } from 'react-router-dom';
import Like from './Like';
import Rate from './Rate';
import { Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface Props {
    user: User | null;
    params: Params;
    token: string;
    review: ReviewDB;
}

const Feedback = ({ user, params, token, review }: Props) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const toSignIn = () => {
        navigate('/registration/sign-in');
    };

    return (
        <div className='flex-colums pb-2'>
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
                        productId={review.product.product_id}
                        token={token}
                        review={review}
                    />
                </div>
            ) : (
                <div className='flex-row justify-start items-baseline gap-3'>
                    <Typography variant='subtitle2'>
                        {t('feedback.askSignin')}
                    </Typography>
                    <Button variant='text' onClick={toSignIn} size='small'>
                        {t('feedback.signin')}
                    </Button>
                </div>
            )}
        </div>
    );
};
export default Feedback;
