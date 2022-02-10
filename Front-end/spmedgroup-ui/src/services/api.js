import axios from 'axios'

const api = axios.create({
    //baseURL: 'http://192.168.3.159:5000/api',
    baseURL: 'https://6204f8ac161670001741b130.mockapi.io',
});

export default api;