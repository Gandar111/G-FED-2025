import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <a id="Impressum" href="#">Impressum</a>
      <a href="#">Datenschutz</a>
      <a href="#">Erklärung zur Barrierefreiheit</a>
    </div>
  );
};

export default Footer;
