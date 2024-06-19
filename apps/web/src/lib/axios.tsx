import axios, { AxiosInstance } from 'axios';

const appConfig = { baseUrl: `http://localhost:8000/api` };
const { baseUrl } = appConfig;
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log(token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
