import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import auth from '../utils/auth';

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(auth.loggedIn());
  const location = useLocation(); // detecta navegación

  useEffect(() => {
    setLoginCheck(auth.loggedIn());
  }, [location]); // se vuelve a chequear cada vez que cambia la ruta

  return (
    <div className='nav'>
      <div className='nav-title'>
        <Link to='/'>Kanban BoardWise</Link>
      </div>
      <ul>
        {!loginCheck ? (
          <li className='nav-item'>
            <button type='button'>
              <Link to='/login'>Login</Link>
            </button>
          </li>
        ) : (
          <li className='nav-item'>
            <button type='button' onClick={() => auth.logout()}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;