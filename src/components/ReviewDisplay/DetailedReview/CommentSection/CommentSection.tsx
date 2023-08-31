import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Params } from 'react-router-dom';
import { fetchComments } from '../../../../services/comment.services/fetchComments';
import { Button, Paper } from '@mui/material';
import { useAuthContext } from '../../../Registration/AuthContext';
import { createComment } from '../../../../services/comment.services/createComment';
import './Comment.scss';
import CommentsField from './CommentsField';
import { useEffect, useRef, useState } from 'react';
import InputComment from './InputComment';
import { useSocket } from '../../../../context/SocketProvider';

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

    const { isLoading, isError, data, error } = useQuery({
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

    if (isError || !data) return null;

    return (
        <Paper className='comment-area gap-3' variant='elevation'>
            {data.length > 0 && (
                <CommentsField data={data} messageEnd={messageEnd} />
            )}
            {token && (
                <InputComment
                    inputText={inputText}
                    setInputText={setInputText}
                    handleSend={handleSend}
                    disabled={disabled}
                />
            )}
        </Paper>
    );
};

export default CommentSection;
