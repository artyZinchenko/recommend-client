import { Paper, Typography } from '@mui/material';
import moment from 'moment';

interface Props {
    data: CommentDB[];
    messageEnd: React.MutableRefObject<HTMLDivElement | null>;
}

const CommentsField = ({ data, messageEnd }: Props) => {
    return (
        <Paper variant='outlined' className='comment-field'>
            {data.map((comment) => {
                return (
                    <Paper variant='outlined' className='comment'>
                        <Typography variant='body2' color='primary'>
                            {comment.author.user_name}
                        </Typography>
                        <Typography variant='body1'>
                            {comment.comment_text}
                        </Typography>
                        <Typography variant='caption'>
                            {moment(comment.create_date).format('DD-MM-YY')}
                        </Typography>
                    </Paper>
                );
            })}
            <div ref={messageEnd} />
        </Paper>
    );
};
export default CommentsField;
