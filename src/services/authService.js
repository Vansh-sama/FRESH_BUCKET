import api, {
  setApiToken,
  clearApiToken,
} from './api';

export const loginApi = async userData => {
  const response = await api.post(
    '/customer/auth/login',
    userData,
  );

  const data = response.data?.data;

  if (data?.accessToken || data?.token) {
    setApiToken(data.accessToken || data.token);
  }

  return {
    ...response.data,
    ...(data || {}),
  };
};

export const registerApi = async userData => {
  const response = await api.post(
    '/customer/auth/register',
    userData,
  );

  const data = response.data?.data;

  if (data?.accessToken || data?.token) {
    setApiToken(data.accessToken || data.token);
  }

  return {
    ...response.data,
    ...(data || {}),
  };
};

export const getProfileApi = async token => {
  if (token) {
    setApiToken(token);
  }

  const response = await api.get(
    '/customer/auth/me',
  );

  return {
    ...response.data,
    ...(response.data?.data || {}),
  };
};

export const logoutApi = () => {
  clearApiToken();
};
