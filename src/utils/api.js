import axios from 'axios';

const API_BASE_URL = 'https://backend-staging.beleef.com.au/api/v1/marketingPrice'; // Replace with your actual API URL

export const fetchCategories = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};