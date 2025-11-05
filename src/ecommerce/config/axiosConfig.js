import axios from 'axios';

const instance = axios.create({
    // baseURL: 'https://fakestoreapi.com/'
    baseURL: "https://react-ecommerce-ajb4.onrender.com/api-docs"
});

export default instance;