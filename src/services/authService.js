import api from './api';

<<<<<<< HEAD
const register = async userData => {
=======
export const registerUser = async userData => {
>>>>>>> main
  const response = await api.post('/auth/register', userData);
  return response.data;
};

<<<<<<< HEAD
const login = async credentials => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

const getMe = async token => {
  const response = await api.get('/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export default {
  register,
  login,
  getMe,
=======
export const loginUser = async userData => {
  const response = await api.post('/auth/login', userData);
  return response.data;
>>>>>>> main
};