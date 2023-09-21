import axios, { AxiosError } from 'axios';
import config from '../../config';

const apiBaseUrl = config.apiBaseUrl + '/reviews';

interface FetchProductsResponse {
    products: ProductDB[];
}

export const fetchProducts = async (): Promise<FetchProductsResponse> => {
    try {
        const response = await axios.get(`${apiBaseUrl}/products`);

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
