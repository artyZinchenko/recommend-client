import axios, { AxiosError } from 'axios';
import config from '../../config';

const apiBaseUrl = config.apiBaseUrl + '/reviews';

interface FetchReviewsResponse {
    reviews: ReviewDB[];
}

export const fetchReviews = async (): Promise<FetchReviewsResponse> => {
    try {
        const response = await axios.get(`${apiBaseUrl}/all-reviews`);

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
