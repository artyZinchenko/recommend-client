import { Params } from 'react-router-dom';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { Typography } from '@mui/material';
import { addLike } from '../../../../services/feedback.services/addLike';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

interface Props {
    user: User | null;
    params: Params;
    token: string;
    likes: LikeDB[];
}

const Like = ({ user, params, token, likes }: Props) => {
    const queryClient = useQueryClient();
    const [blocked, setBlocked] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        const liked = !!likes.find((like) => {
            return like.userId === user?.id_user;
        });
        setIsLiked(liked);
    }, [setIsLiked]);

    const handleClick = async () => {
        if (blocked || isLiked) return;
        setBlocked(true);
        setIsLiked(true);
        try {
            const like = await addLike(token, params?.reviewId, user?.id_user);

            queryClient.setQueriesData(
                {
                    queryKey: [user?.id_user],
                },
                (oldReviews: ReviewDB[] | undefined) => {
                    if (!oldReviews) return [];
                    oldReviews.map((review) => {
                        return { ...review, likes: [...review.likes, like] };
                    });
                }
            );
            queryClient.invalidateQueries([user?.id_user]);
        } catch (err) {
            console.log(err);
        } finally {
            setBlocked(false);
        }
    };

    return (
        <div
            className='flex-row width-fit justify-start items-center gap-1 pointer'
            onClick={handleClick}
        >
            <ThumbUpOutlinedIcon
                fontSize='small'
                color={isLiked ? 'primary' : 'disabled'}
            />
            <Typography
                variant='subtitle2'
                color={isLiked ? 'primary' : 'gray'}
            >
                {t('feedback.useful')}
            </Typography>
        </div>
    );
};
export default Like;
