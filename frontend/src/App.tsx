import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import LocationList from './components/LocationList';
import LocationDetail from './components/LocationDetail';
import EditLocation from './pages/EditLocation';
import AddLocation from './pages/AddLocation';
import AboutPage from './pages/AboutPage';
import ErrorPage from './pages/ErrorPage';

import { User } from './types/User';

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const handleLoginSuccess = (userData: User) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <Header />

      {user && (
        <div style={{ textAlign: 'right', padding: '1rem' }}>
          👤 {user.username}
          <button onClick={handleLogout} style={{ marginLeft: '1rem' }}>
            Logout
          </button>
        </div>
      )}

      <main>
        <Routes>
          {!user ? (
            <>
              <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          ) : (
            <>
              <Route path="/locations" element={<LocationList user={user} />} />
              {/*<Route path="/locations/:id" element={<LocationDetail user={user} />} />*/}
      <Route path="/locations/edit/:id" element={<EditLocation user={user} />} />


         <Route path="/locations/add" element={<AddLocation user={user} />} />

              <Route path="/about" element={<AboutPage />} />
              <Route path="/" element={<Navigate to="/locations" replace />} />
              <Route path="*" element={<ErrorPage />} />
            </>
          )}
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
