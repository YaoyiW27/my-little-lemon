import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="hero-section">
      <div className="hero-content">
        <h1>Little Lemon</h1>
        <h2>Chicago</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
        <Link to="/reservations" className="cta-button">
          Reserve a Table
        </Link>
      </div>
    </header>
  );
};

export default Header;