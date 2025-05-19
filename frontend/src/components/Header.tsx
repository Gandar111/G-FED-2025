import React from 'react';
import './Header.css'; // Optional: eigene CSS-Datei für den Header

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <img
        src = "/logo2.png"
        alt="App-Logo"
        className="app-logo"
      />
      <h1>BERLIN ENTWICKLUNGSMAP</h1>
    </header>
  );
};

export default Header;
