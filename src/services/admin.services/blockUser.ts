import axios, { AxiosError } from 'axios';
import config from '../../config';

const apiBaseUrl = config.apiBaseUrl + '/admin';

interface BlockUserResponse {
    user: User;
    message: string;
}

export const blockUser = async (
    user: User,
    token: string
): Promise<BlockUserResponse> => {
    try {
        const response = await axios.put(
            `${apiBaseUrl}/block-user`,
            { user },
            {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            }
        );
        console.log(response.data.user);

        return response.data;
    } catch (err) {
        let message = '';
        if (err instanceof AxiosError) {
            message += err.message;
            message += ' ' + err.response?.data.message || '';
        }
        throw new Error(message);
    }
};
