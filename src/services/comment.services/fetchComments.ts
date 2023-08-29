import axios, { AxiosError } from 'axios';
import config from '../../config';

const apiBaseUrl = config.apiBaseUrl + '/comments';

interface FetchReviewsResponse {
    comments: CommentDB[];
}

export const fetchComments = async (
    reviewId: string
): Promise<FetchReviewsResponse> => {
    try {
        const response = await axios.get(`${apiBaseUrl}/${reviewId}`);

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
