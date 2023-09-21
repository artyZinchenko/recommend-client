import axios, { AxiosError } from 'axios';
import config from '../../config';

const apiBaseUrl = config.apiBaseUrl + '/users';

interface TotalLikesResponse {
    total_likes: number;
}

export const getTotalLikes = async (
    token: string
): Promise<TotalLikesResponse> => {
    try {
        const response = await axios.get(`${apiBaseUrl}/getUserLikes`, {
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
