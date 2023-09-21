import axios, { AxiosError } from 'axios';
import config from '../../config';

const apiBaseUrl = config.apiBaseUrl + '/feedback';

interface AddRatingResponse {
    like: RateDB;
    message: string;
}

export const addRating = async (
    token: string,
    productId: number | undefined,
    userId: string | undefined,
    rating: number
): Promise<AddRatingResponse> => {
    if (!productId || !userId) throw new Error('No review-id or user-id');

    try {
        const response = await axios.post(
            `${apiBaseUrl}/add-rating`,
            { productId, userId, rating },
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
            message = err.response?.data.message;
        }
        throw new Error(message);
    }
};
