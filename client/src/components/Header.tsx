import { Link } from 'react-router-dom';
import viteLogo from '/vite.svg';
import AuthService from '../utils/auth';

const Header = () => {
  const handleLogout = () => {
    AuthService.logout();
  };

  return (
    <header className="slim-header">
      <div className="slim-header-content">
        <Link to="/" className="slim-header-logo">
          <img src={viteLogo} alt="Kanban Board Logo" />
          <span>Kanban Board</span>
        </Link>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header; 