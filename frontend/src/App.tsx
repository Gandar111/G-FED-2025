import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LocationList from './components/LocationList';
import Login from './components/Login';
import { User } from './types/User';

function App() {
  const [user, setUser] = useState<User | null>(null);

  // Login-Status aus localStorage wiederherstellen
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Wird bei erfolgreichem Login aufgerufen
  const handleLoginSuccess = (userData: User) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  // Logout-Funktion
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div>
      <Header />

      {/* Logout-Button oben anzeigen */}
      {user && (
        <div style={{ textAlign: 'right', padding: '1rem' }}>
          <span style={{ marginRight: '1rem' }}>👤 {user.username}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      <main>
        {!user ? (
          <Login onLoginSuccess={handleLoginSuccess} />
        ) : (
          <LocationList user={user} />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
