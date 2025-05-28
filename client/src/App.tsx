import { Outlet, useNavigate } from 'react-router-dom';
import { useSessionTimeout } from './hooks/useSessionTimeout';
import { useEffect } from 'react';
import AuthService from './utils/auth';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // If not authenticated and not on login page, redirect to login
    if (!AuthService.isAuthenticated() && window.location.pathname !== '/login') {
      navigate('/login');
    }
  }, [navigate]);

  useSessionTimeout();

  return (
    <div className="app">
      <Outlet />
    </div>
  );
}

export default App;
