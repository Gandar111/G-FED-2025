import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '3rem' }}>
      <h1>🚫 Fehler 404</h1>
      <p>Die angeforderte Seite wurde nicht gefunden oder es ist ein Fehler aufgetreten.</p>
      <button onClick={() => navigate('/')} style={{ marginTop: '1rem' }}>
        Zur Startseite
      </button>
    </div>
  );
};

export default ErrorPage;
