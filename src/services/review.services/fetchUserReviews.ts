import axios, { AxiosError } from 'axios';
import config from '../../config';

const apiBaseUrl = config.apiBaseUrl + '/reviews';

interface FetchUserReviewsResponse {
    reviews: ReviewDB[];
}

export const fetchUserReviews = async (
    requsestedId: string,
    token: string
): Promise<FetchUserReviewsResponse> => {
    try {
        const response = await axios.get(
            `${apiBaseUrl}/user-reviews/${requsestedId}`,
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
