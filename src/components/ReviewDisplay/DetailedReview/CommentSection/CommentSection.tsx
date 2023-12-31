import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Params } from 'react-router-dom';
import { fetchComments } from '../../../../services/comment.services/fetchComments';
import { Typography } from '@mui/material';
import { useAuthContext } from '../../../../context/AuthContext';
import { createComment } from '../../../../services/comment.services/createComment';
import './Comment.scss';
import CommentsField from './CommentsField';
import { useEffect, useRef, useState } from 'react';
import InputComment from './InputComment';
import { useSocket } from '../../../../context/SocketProvider';
import { useTranslation } from 'react-i18next';

interface Props {
    user: User | null;
    params: Params;
}

const CommentSection = ({ user, params }: Props) => {
    const { token } = useAuthContext();
    const { socket } = useSocket();
    const [inputText, setInputText] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [shouldScrollDown, setShoulScrollDown] = useState(false);
    const queryClient = useQueryClient();
    const messageEnd = useRef<HTMLDivElement | null>(null);
    const { t } = useTranslation();

    useEffect(() => {
        socket?.emit('joinReview', params.reviewId);
        socket?.on('commentAdded', (newComment) => {
            queryClient.setQueryData(
                [params.reviewId, 'comments'],
                (oldComments: CommentDB[] | undefined) => {
                    if (!oldComments) return [newComment];
                    return [...oldComments, newComment];
                }
            );
            setShoulScrollDown(true);
        });

        return () => {
            socket?.off('commentAdded');
            socket?.emit('leaveReview', params.reviewId);
        };
    }, []);

    const { isError, data } = useQuery({
        queryKey: [params.reviewId, 'comments'],
        queryFn: async () => {
            if (!params.reviewId) throw new Error('No reviewId');
            const data = await fetchComments(params.reviewId);
            return data.comments;
        },
        staleTime: 5 * 60 * 1000,
    });

    const addComment = useMutation({
        mutationFn: async (newComment: string) => {
            const data = await createComment(
                newComment,
                token,
                params.reviewId
            );
            return data.comment;
        },
    });

    useEffect(() => {
        if (!shouldScrollDown) return;
        messageEnd.current?.scrollIntoView({ behavior: 'smooth' });
    }, [data, shouldScrollDown]);

    const handleSend = async () => {
        setDisabled(true);
        if (inputText.length < 1) return;
        try {
            addComment.mutate(inputText);
            setInputText('');
        } catch (err) {
            console.log(err);
        } finally {
            setDisabled(false);
        }
    };

    if (isError) return null;

    return (
        <div className='comment-area gap-3'>
            {data && data.length > 0 && (
                <>
                    <Typography>{t('comment.comments')}</Typography>
                    <CommentsField data={data} messageEnd={messageEnd} />
                </>
            )}
            {token && (
                <InputComment
                    inputText={inputText}
                    setInputText={setInputText}
                    handleSend={handleSend}
                    disabled={disabled}
                />
            )}
        </div>
    );
};

export default CommentSection;
