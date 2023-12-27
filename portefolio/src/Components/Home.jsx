// Home.js
import React, { useState, useEffect } from 'react';
import Loading from './Loading';

const Home = ({ darkMode }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={`border transition-all duration-500 ${darkMode ? 'border' : 'dark-border'}`}>
      <div className={`infos transition-all duration-500 ${darkMode ? 'dark-infos' : ''}`}>
        <h1 className={`text-3xl transition-all duration-500 ${darkMode ? 'text-white' : 'text-black'} font-bold`}>Téo Bacher</h1>
        <h6 className={`transition-all duration-500 ${darkMode ? 'text-white' : 'text-black'} text-sm`}>Développeur fullstack</h6>
      </div>
      <br />
      <br />
      <div className={`infos transition-all duration-500 ${darkMode ? 'dark-infos' : ''}`}>
        <p className={`transition-all duration-500 ${darkMode ? 'text-white' : 'text-black'}`}> Projets</p>
        <p className={`transition-all duration-500 ${darkMode ? 'text-white' : 'text-black'}`}> À propos</p>
        <p className={`transition-all duration-500 ${darkMode ? 'text-white' : 'text-black'}`}> Contact</p>
      </div>
    </div>
  );
};

export default Home;
