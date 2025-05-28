import axios from 'axios';
import AuthService from '../utils/auth';

const API_URL = 'http://localhost:3001/api';

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password,
    });
    
    if (response.data.token) {
      AuthService.login(response.data.token);
    }
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  AuthService.logout();
};

export const getAuthHeader = () => {
  return AuthService.getAuthHeader();
};
