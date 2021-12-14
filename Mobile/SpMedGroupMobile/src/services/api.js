import axios from 'axios';

const api = axios.create({
    //baseURL: 'http://192.168.3.159:5000/api',
    baseURL: 'http://10.0.0.103:5000/api',
});

export default api;