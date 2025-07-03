import React from 'react';
import './AboutPage.css';

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <h2>Über uns</h2>
      <p>
        Diese Anwendung wurde im Rahmen eines Hochschulprojekts entwickelt. Sie dient dem Anzeigen und Verwalten von Standorten in Berlin.
      </p>
      <p>
        Impressum, rechtliche Hinweise und Datenschutzrichtlinien finden Sie hier.
      </p>
    </div>
  );
};

export default AboutPage;