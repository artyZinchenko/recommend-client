import axios, { AxiosError } from 'axios';
import config from '../../config';

const apiBaseUrl = config.apiBaseUrl + '/reviews';

interface FetchReviewResponse {
    review: ReviewDB;
}

export const fetchReviewById = async (
    id: string
): Promise<FetchReviewResponse> => {
    try {
        const response = await axios.get(`${apiBaseUrl}/reviewById/${id}`);

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
