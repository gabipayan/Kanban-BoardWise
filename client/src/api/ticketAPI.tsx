import axios from 'axios';
import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';
import AuthService from '../utils/auth';

const API_URL = 'http://localhost:3001/api';

export const retrieveTickets = async (): Promise<TicketData[]> => {
  try {
    const response = await axios.get(`${API_URL}/tickets`, {
      headers: AuthService.getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Error retrieving tickets:', error);
    throw error;
  }
};

export const retrieveTicket = async (id: number): Promise<TicketData> => {
  try {
    const response = await axios.get(`${API_URL}/tickets/${id}`, {
      headers: AuthService.getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error(`Error retrieving ticket ${id}:`, error);
    throw error;
  }
};

export const createTicket = async (ticketData: TicketData): Promise<TicketData> => {
  try {
    const response = await axios.post(`${API_URL}/tickets`, ticketData, {
      headers: AuthService.getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Error creating ticket:', error);
    throw error;
  }
};

export const updateTicket = async (id: number, ticketData: TicketData): Promise<TicketData> => {
  try {
    const response = await axios.put(`${API_URL}/tickets/${id}`, ticketData, {
      headers: AuthService.getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating ticket ${id}:`, error);
    throw error;
  }
};

export const deleteTicket = async (id: number): Promise<ApiMessage> => {
  try {
    const response = await axios.delete(`${API_URL}/tickets/${id}`, {
      headers: AuthService.getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting ticket ${id}:`, error);
    throw error;
  }
};
