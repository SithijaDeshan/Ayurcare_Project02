import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/predict';

const getSpecialtyRecommendation = async (symptoms) => {
    try {
        const response = await axios.post(API_URL, { symptoms });
        return response.data;
    } catch (error) {
        console.error("Error while fetching specialty recommendation:", error);
        throw error;
    }
};

export default getSpecialtyRecommendation;
