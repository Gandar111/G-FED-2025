import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

type Props = {
  onLoginSuccess: (user: { username: string; role: string }) => void;
};

const Login: React.FC<Props> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('http://13.60.78.19:8001/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const user = await res.json();
        localStorage.setItem('user', JSON.stringify(user));
        onLoginSuccess(user);
        navigate('/locations');
      } else {
        setError('Login fehlgeschlagen. Bitte überprüfe die Daten.');
      }
    } catch (err) {
      setError('Serverfehler beim Login.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Benutzername" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Passwort" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Einloggen</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Login;
