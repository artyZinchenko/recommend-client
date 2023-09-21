import axios, { AxiosError } from 'axios';
import config from '../../config';

const apiBaseUrl = config.apiBaseUrl + '/admin';

interface GrantAdminResponse {
    user: User;
    message: string;
}

export const grantAdmin = async (
    user: User,
    token: string
): Promise<GrantAdminResponse> => {
    try {
        const response = await axios.put(
            `${apiBaseUrl}/grant-admin`,
            { user },
            {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            }
        );

        return response.data;
    } catch (err) {
        let message = '';
        if (err instanceof AxiosError) {
            message = err.response?.data.message;
        }
        throw new Error(message);
    }
};
