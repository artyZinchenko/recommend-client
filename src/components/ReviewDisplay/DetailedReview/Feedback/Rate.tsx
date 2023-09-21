import { Rating, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { addRating } from '../../../../services/feedback.services/addRating';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

interface Props {
    user: User | null;
    productId: number;
    token: string;
    review: ReviewDB;
}

const Rate = ({ user, productId, token, review }: Props) => {
    const [value, setValue] = useState(0);
    const [readOnly, setReadOnly] = useState(false);
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    useEffect(() => {
        const userRated = review.product.ratings.find(
            (r) => r.userId === user?.id_user
        );
        if (userRated) {
            setValue(userRated.rate_number);
            setReadOnly(true);
        }
    }, []);

    const handleChange = async (
        event: React.SyntheticEvent<Element, Event>,
        newValue: number | null
    ) => {
        try {
            if (!newValue) return;
            setValue(newValue);
            await addRating(token, productId, user?.id_user, newValue);

            setReadOnly(true);
            queryClient.invalidateQueries([user?.id_user]);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='flex-row justify-start width-fit gap-1 items-center'>
            <Typography variant='subtitle2' sx={{ textAlign: 'end' }}>
                {t('feedback.rate')} {'  '}
                {review.product.product_name}
            </Typography>
            <Rating
                name='simple-controlled'
                value={value}
                readOnly={readOnly}
                onChange={(event, newValue) => handleChange(event, newValue)}
            />
        </div>
    );
};

export default Rate;
