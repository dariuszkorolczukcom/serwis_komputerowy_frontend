import api from './client';

export const login = async (username: string, password: string) => {
  const response = await api.post('/auth/jwt/create/', { username, password });
  return response.data;
};

export const register = async (email: string, username: string, password: string) => {
  const response = await api.post('/auth/users/', { email, username, password });
  return response.data;
};

export const getUser = async () => {
  const response = await api.get('/auth/users/me');
  return response.data;
};