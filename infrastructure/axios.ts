import axios, { AxiosError, AxiosResponse } from 'axios';

const instance = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:3000/api',
});

instance.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => {
    console.error(error);
    return Promise.reject(error);
  }
);

export default instance;
