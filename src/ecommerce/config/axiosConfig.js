import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-ecommerce-ajb4.onrender.com/api',
});

// Currency Exchange API - Fixed the baseURL property name
const exchnageRateAPI = axios.create({
    baseURL: 'https://v6.exchangerate-api.com/v6/e928549c3a8e6ff1d81c0d0b/latest'
});

export default instance
export { exchnageRateAPI }