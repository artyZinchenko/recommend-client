import axios, { AxiosError } from 'axios';
import config from '../../config';

const apiBaseUrl = config.apiBaseUrl + '/reviews';

interface CreateReviewResponse {
    review: Review;
    message: string;
}

export const updateReview = async (
    updated: UpdateReview,
    token: string
): Promise<CreateReviewResponse> => {
    console.log(updated);
    try {
        const response = await axios.put(`${apiBaseUrl}/update`, updated, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        console.log(response.data.review);

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
