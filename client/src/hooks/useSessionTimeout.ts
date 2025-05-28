import { useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../utils/auth';

const TIMEOUT_DURATION = 60 * 1000; // 1 minute in milliseconds

export const useSessionTimeout = () => {
  const navigate = useNavigate();
  const timeoutRef = useRef<number>();

  const resetTimer = useCallback(() => {
    if (AuthService.isAuthenticated()) {
      const token = AuthService.getToken();
      if (token) {
        try {
          const decoded = AuthService.getProfile();
          if (decoded) {
            // Reset the token with a new expiration
            AuthService.setToken(token);
            console.log('Session timer reset');
          }
        } catch (error) {
          // If token is invalid, log out
          console.log('Invalid token, logging out');
          AuthService.logout();
          navigate('/login');
        }
      }
    }
  }, [navigate]);

  useEffect(() => {
    const handleUserActivity = () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      resetTimer();
      timeoutRef.current = window.setTimeout(() => {
        if (AuthService.isAuthenticated()) {
          console.log('Session timed out after 1 minute of inactivity');
          AuthService.logout();
          navigate('/login');
        }
      }, TIMEOUT_DURATION);
    };

    // Add event listeners for user activity
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);
    window.addEventListener('click', handleUserActivity);
    window.addEventListener('scroll', handleUserActivity);

    // Initial setup
    handleUserActivity();
    console.log('Session timeout initialized - 1 minute');

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      window.removeEventListener('click', handleUserActivity);
      window.removeEventListener('scroll', handleUserActivity);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [navigate, resetTimer]);
}; 