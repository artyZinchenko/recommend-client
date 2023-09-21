import axios, { AxiosError } from 'axios';
import config from '../../config';

const apiBaseUrl = config.apiBaseUrl + '/users';

export interface LoginResponse {
    user: User;
    token: string;
    message: string;
}

export const signInFirebase = async (
    uid: string,
    token: string,
    emailForTwitter: string | null
): Promise<LoginResponse> => {
    try {
        const response = await axios.post(`${apiBaseUrl}/signin-firebase`, {
            uid,
            token,
            emailForTwitter,
        });

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
