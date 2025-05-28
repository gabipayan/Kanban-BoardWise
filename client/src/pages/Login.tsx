import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authAPI';
import viteLogo from '/vite.svg';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(username, password);
      navigate('/');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className='container'>
      <div className='login-header'>
        <img src={viteLogo} alt="Kanban Board Logo" className='login-logo' />
        <h1 className='login-title'>Kanban Board</h1>
      </div>
      <form className='form' onSubmit={handleSubmit}>
        <h2>Login</h2>
        
        <label htmlFor='username'>Username</label>
        <input
          id='username'
          name='username'
          type='text'
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor='password'>Password</label>
        <input
          id='password'
          name='password'
          type='password'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <div className='error-message'>{error}</div>}

        <button type='submit'>Sign In</button>
      </form>
    </div>
  );
};

export default Login;
