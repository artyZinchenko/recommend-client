import axios, { AxiosError } from 'axios';
import config from '../../config';

const apiBaseUrl = config.apiBaseUrl + '/reviews';

interface DeleteReviewResponse {
    deletedReview: ReviewDB;
    message: string;
}

export const deleteReview = async (
    reviewId: string | undefined,
    token: string
): Promise<DeleteReviewResponse> => {
    if (!reviewId) throw new Error('Review id not defined');
    try {
        const response = await axios.put(
            `${apiBaseUrl}/delete-review/${reviewId}`,
            {},
            {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            }
        );

        return response.data;
    } catch (err) {
        let message = '';
        if (err instanceof AxiosError) {
            message = err.response?.data.message;
        }
        throw new Error(message);
    }
};
