import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.example.com',
    timeout: 5000,

});

api.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem('token');

        if (token) config.headers['Authorization'] = `Bearer ${token}`;
        console.log('Axios Request', 'color: blue', {
            url: config.url,
            method: config.method,
            data: config.data,
            headers: config.headers,
            token: config.headers.token
        });

        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
