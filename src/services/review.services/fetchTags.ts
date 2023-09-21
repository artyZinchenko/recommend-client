import axios, { AxiosError } from 'axios';
import config from '../../config';

const apiBaseUrl = config.apiBaseUrl + '/reviews';

interface FetchTagsResponse {
    tags: Tag[];
}

export const fetchTags = async (): Promise<FetchTagsResponse> => {
    try {
        const response = await axios.get(`${apiBaseUrl}/tags`);

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
