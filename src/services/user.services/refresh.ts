import axios, { AxiosError } from 'axios';
import config from '../../config';

const apiBaseUrl = config.apiBaseUrl + '/users';

interface RefreshResponse {
    user: User;
    message: string;
}

export const refresh = async (token: string): Promise<RefreshResponse> => {
    try {
        const response = await axios.get(`${apiBaseUrl}/refresh`, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });

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
