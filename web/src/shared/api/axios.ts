import axios, { InternalAxiosRequestConfig } from 'axios';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const $axios = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

$axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('accessToken');

  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }

  return config;
});

export default $axios;
