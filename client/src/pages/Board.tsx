import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { retrieveTickets, deleteTicket } from '../api/ticketAPI';
import AuthService from '../utils/auth';
import Header from '../components/Header';
import ErrorPage from './ErrorPage';
import Swimlane from '../components/Swimlane';
import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';
import { useDebug } from '../context/DebugContext';

const boardStates = ['Todo', 'In Progress', 'Done'];

const Board = () => {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { showError, showDebug } = useDebug();

  const fetchTickets = async () => {
    try {
      showDebug('Fetching tickets...');
      const data = await retrieveTickets();
      setTickets(data);
      showDebug(`Retrieved ${data.length} tickets`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to retrieve tickets';
      showError(errorMessage);
      console.error('Failed to retrieve tickets:', err);
      setError(true);
    }
  };

  const deleteIndvTicket = async (ticketId: number): Promise<ApiMessage> => {
    try {
      showDebug(`Deleting ticket ${ticketId}...`);
      const data = await deleteTicket(ticketId);
      showDebug(`Ticket ${ticketId} deleted successfully`);
      fetchTickets();
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete ticket';
      showError(errorMessage);
      return Promise.reject(err);
    }
  };

  useEffect(() => {
    if (AuthService.isAuthenticated()) {
      showDebug('User authenticated, fetching tickets...');
      fetchTickets();
    }
  }, []);

  return (
    <>
      <Header />
      <div className='board'>
        {!AuthService.isAuthenticated() ? (
          <div className='login-notice'>
            <h2>Please log in to view the board</h2>
            <button onClick={() => navigate('/login')}>Go to Login</button>
          </div>
        ) : error ? (
          <ErrorPage />
        ) : (
          <>
            <div className='board-actions'>
              <button type='button' className='create-ticket-button'>
                <Link to='/create'>New Ticket</Link>
              </button>
            </div>
            <div className='board-display'>
              {boardStates.map((status) => {
                const filteredTickets = tickets.filter(ticket => ticket.status === status);
                return (
                  <Swimlane
                    title={status}
                    key={status}
                    tickets={filteredTickets}
                    deleteTicket={deleteIndvTicket}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Board;
