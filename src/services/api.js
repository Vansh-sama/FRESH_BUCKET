import axios from 'axios';

<<<<<<< HEAD
const API_BASE_URL = 'http://10.0.2.2:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
=======
const api = axios.create({
  baseURL: 'http://10.0.2.2:5000/api',
>>>>>>> main
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;