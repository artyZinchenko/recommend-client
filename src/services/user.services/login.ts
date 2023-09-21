import axios, { AxiosError } from 'axios';
import config from '../../config';

const apiBaseUrl = config.apiBaseUrl + '/users';

export interface LoginResponse {
    user: User;
    token: string;
    message: string;
}

export const login = async (
    credentials: Credentials
): Promise<LoginResponse> => {
    try {
        const response = await axios.post(`${apiBaseUrl}/login`, credentials);

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
