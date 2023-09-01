import axios, { AxiosError } from 'axios';
import config from '../../config';

const apiBaseUrl = config.apiBaseUrl + '/feedback';

interface AddLikeResponse {
    like: LikeDB;
    message: string;
}

export const addLike = async (
    token: string,
    reviewId: string | undefined,
    userId: string | undefined
): Promise<AddLikeResponse> => {
    if (!reviewId || !userId) throw new Error('No review-id or user-id');

    try {
        const response = await axios.post(
            `${apiBaseUrl}/add-like`,
            { reviewId, userId },
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
