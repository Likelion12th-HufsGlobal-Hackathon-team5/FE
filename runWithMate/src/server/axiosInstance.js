import axios from 'axios';
import { serverIp } from './serverInfo';

const axiosInstance = axios.create({
    baseURL: serverIp,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

axiosInstance.interceptors.request.use((config) => {
    const authorization = localStorage.getItem('Authorization');
    if (authorization) {
        config.headers.Authorization = authorization;
    }
    return config;
});

export default axiosInstance;