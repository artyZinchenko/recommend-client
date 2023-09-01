import { Rating, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { addRating } from '../../../../services/feedback.services/addRating';
import { Params } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
    user: User | null;
    params: Params;
    token: string;
    review: ReviewDB;
}

const Rate = ({ user, params, token, review }: Props) => {
    const [value, setValue] = useState(0);
    const [readOnly, setReadOnly] = useState(false);
    const queryClient = useQueryClient();

    useEffect(() => {
        const userRated = review.ratings.find(
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
            const newRating = await addRating(
                token,
                params.reviewId,
                user?.id_user,
                newValue
            );

            console.log(newRating);
            setReadOnly(true);
            queryClient.invalidateQueries([user?.id_user]);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='flex-row justify-start width-fit gap-1 items-center'>
            <Typography variant='subtitle2'>Rate review</Typography>
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
