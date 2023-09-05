import axios, { AxiosError } from 'axios';
import config from '../../config';

const apiBaseUrl = config.apiBaseUrl + '/admin';

interface GetUsersResponse {
    users: User[];
}

export const getUsers = async (token: string): Promise<GetUsersResponse> => {
    try {
        const response = await axios.get(`${apiBaseUrl}/get-users`, {
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
