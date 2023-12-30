// Home.js
import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import Pixel3DAnimation from './Pixel3DAnimation';

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
    <div className={`relative border transition-all duration-500 ${darkMode ? 'border' : 'dark-border'}`}>
      <Pixel3DAnimation isDarkTheme={darkMode}/>
      <div className={`infos absolute top-0 left-0 right-0 text-center transition-all duration-500 ${darkMode ? 'dark-infos' : ''}`} style={{ zIndex: 2, margin: '4vh' }}>
        <h1 className={`text-3xl transition-all duration-500 ${darkMode ? 'text-white' : 'text-black'} font-bold`}>Téo Bacher</h1>
        <h6 className={`transition-all duration-500 ${darkMode ? 'text-white' : 'text-black'} text-sm`}>Développeur fullstack</h6>
        <div className={`infos mt-4 ${darkMode ? 'dark-infos' : ''}`}>
          <p className={`transition-all duration-500 ${darkMode ? 'text-white' : 'text-black'}`}> Projets</p>
          <p className={`transition-all duration-500 ${darkMode ? 'text-white' : 'text-black'}`}> À propos</p>
          <p className={`transition-all duration-500 ${darkMode ? 'text-white' : 'text-black'}`}> Contact</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
