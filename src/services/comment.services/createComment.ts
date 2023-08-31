import axios, { AxiosError } from 'axios';
import config from '../../config';

const apiBaseUrl = config.apiBaseUrl + '/comments';

interface CreateCommentResponse {
    comment: CommentDB;
    message: string;
}

export const createComment = async (
    text: string,
    token: string,
    reviewId: string | undefined
): Promise<CreateCommentResponse> => {
    if (!reviewId) throw new Error('No reviewId');
    try {
        const response = await axios.post(
            `${apiBaseUrl}/add-comment`,
            { text, reviewId },
            {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            }
        );

        return response.data;
    } catch (err) {
        console.log(err);
        let message = 'Error ';
        if (err instanceof AxiosError) {
            message += err.response?.data.message;
        }
        throw new Error(message);
    }
};
