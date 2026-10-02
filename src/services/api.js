import axios from 'axios';
import {Platform} from 'react-native';

const DEV_HOST =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:5000'
    : 'http://localhost:5000';

const API_BASE_URL =
  __DEV__
    ? `${DEV_HOST}/api/v1`
    : 'https://fresh-bucket-web.onrender.com/api/v1';

let authToken = null;

export const setApiToken = token => {
  authToken = token || null;
};

export const clearApiToken = () => {
  authToken = null;
};

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(config => {
  if (authToken) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${authToken}`;
  }

  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    console.log(
      'API ERROR:',
      error?.response?.status,
      error?.response?.data || error?.message,
    );

    return Promise.reject(error);
  },
);

export default api;
