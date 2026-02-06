import { post } from './api';

export const login = async (username, password) => {
  try {
    const response = await post('/auth/login', {
      email: username,
      password: password,
    });
    const data = response.data;
    return { data: data, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
};
