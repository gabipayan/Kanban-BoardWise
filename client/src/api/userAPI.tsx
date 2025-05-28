import axios from 'axios';
import { UserData } from '../interfaces/UserData';
import AuthService from '../utils/auth';

const API_URL = 'http://localhost:3001/api';

export const retrieveUsers = async (): Promise<UserData[]> => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      headers: AuthService.getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Error retrieving users:', error);
    throw error;
  }
};
