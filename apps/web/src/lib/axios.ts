import axios, { AxiosInstance } from 'axios';
import { BASE_API_URL } from '../utils/config';

const getToken = () => {
  try {
    const token = localStorage.getItem('token');
    return token;
  } catch (err) {
    return '';
  }
};

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_API_URL,
  headers: { 'Access-Control-Allow-Origin': '*' },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
