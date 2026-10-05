import api from './api';

const register = async userData => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

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
};