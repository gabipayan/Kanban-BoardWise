import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './index.css';

import App from './App.tsx';
import Board from './pages/Board.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import EditTicket from './pages/EditTicket.tsx';
import CreateTicket from './pages/CreateTicket.tsx';
import Login from './pages/Login.tsx';
import AuthService from './utils/auth';
import ProtectedRoute from './components/ProtectedRoute';
import { DebugProvider } from './context/DebugContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Board />
          </ProtectedRoute>
        )
      },
      {
        path: 'board',
        element: (
          <ProtectedRoute>
            <Board />
          </ProtectedRoute>
        )
      },
      {
        path: 'edit/:id',
        element: (
          <ProtectedRoute>
            <EditTicket />
          </ProtectedRoute>
        )
      },
      {
        path: 'create',
        element: (
          <ProtectedRoute>
            <CreateTicket />
          </ProtectedRoute>
        )
      },
      {
        path: 'login',
        element: AuthService.isAuthenticated() ? <Navigate to="/" replace /> : <Login />
      },
      {
        path: '*',
        element: <Navigate to="/" replace />
      }
    ]
  }
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <DebugProvider>
      <RouterProvider router={router} />
    </DebugProvider>
  );
}
