import { Params, useNavigate } from 'react-router-dom';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { Button, Typography } from '@mui/material';
import { addLike } from '../../../../services/feedback.services/addLike';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

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

    useEffect(() => {
        const liked = !!likes.find((like) => {
            return like.userId === user?.id_user;
        });
        setIsLiked(liked);
    }, []);

    const handleClick = async () => {
        if (blocked || isLiked) return;
        setBlocked(true);
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

            setIsLiked(true);
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
                Useful
            </Typography>
        </div>
    );
};
export default Like;
