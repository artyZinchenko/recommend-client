import axios, { AxiosError } from 'axios';
import config from '../../config';

const apiBaseUrl = config.apiBaseUrl + '/reviews';

interface CreateReviewResponse {
    review: ReviewDB;
    message: string;
}

export const createReview = async (
    newReview: NewReview,
    token: string
): Promise<CreateReviewResponse> => {
    if (!newReview.product) throw new Error('Missing product');
    try {
        const response = await axios.post(`${apiBaseUrl}/create`, newReview, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });

        return response.data;
    } catch (err) {
        console.log(err);
        let message = 'Error ';
        if (err instanceof AxiosError) {
            message = err.response?.data.message;
        }
        throw new Error(message);
    }
};
