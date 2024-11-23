import React from 'react';
import Header from '../components/Header';
import Specials from '../components/Specials';

const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      <Specials />
      {/* Add more sections as needed */}
    </div>
  );
};

export default HomePage;