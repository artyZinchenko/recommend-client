import axios, { AxiosError } from 'axios';
import config from '../../config';

const apiBaseUrl = config.apiBaseUrl + '/reviews';

interface FetchReviewsResponse {
    reviews: ReviewDB[];
}

export const fulltext = async (
    query: string
): Promise<FetchReviewsResponse> => {
    try {
        const response = await axios.get(`${apiBaseUrl}/fulltext/${query}`);

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
