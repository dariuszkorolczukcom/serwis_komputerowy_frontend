import api from './client';

export const login = async (username: string, password: string) => {
  console.log("here")
  const response = await api.post('/auth/jwt/create/', { username, password });
  console.log("here", response)
  return response.data;
};

export const register = async (email: string, username: string, password: string) => {
  const response = await api.post('/auth/users/', { email, username, password });
  return response.data;
};
