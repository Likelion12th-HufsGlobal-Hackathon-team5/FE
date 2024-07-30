import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.runwithmate.klr.kr',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    },
});

axiosInstance.interceptors.request.use((config) => {
    const authorization = localStorage.getItem('Authorization');
    if (authorization) {
        config.headers.Authorization = authorization;
    }
    return config;
});

export default axiosInstance;